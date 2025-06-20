---
title: Global Game Jam 2024 Postmortem
marp: true
theme: default
paginate: true
style: |
  ul {
    padding: 0 1em;
  }
---

<!--

- I want to create a scene, where are scenes?
- Nodes? Oh, are those prefabs?
- Wtf why there are so many nodes?
- How am I supposed to make a player with only one script?
- Ok I made a script, now how do I move the Player?
- My player is not moving, why?
- How do I spawn a projectile?
- I see Godot has RigidBodies... but how do I do collision without layers?
- I want to add a cooldown but... wait where are Coroutines?
- // Events
- I think I need a GameManager, does Godot support singletons?
- Why there are so many options in the inspector? It's so annoying
- How do I pause the game? Where is the timescale?
- My beloved ScriptableObjects, I miss them...
- There are no PlayerPrefs? How tf I'm supposed to save data?
- I want to make a Game Over screen, how do I change scene?


-->

# Back to Unity island (si va a Godotpoli)

Giorgio Pomettini ([@pomettini](https://github.com/pomettini))

---

<center>

## Growing up, I want to <strike>be a pirate</strike> make videogames!

</center>

---

## Me in 2010

// Inserire libro di Unity

---

## Hi I'm Pomettini

// Inserire foto montaggio con tutte le cose per cui ho sviluppato

---

<center>

## So you want to learn Godot?

Well, you gotta start somewhere...

</center>

---

![bg fit 80%](images/editor_intro_editor_empty_webp.png)

---

## Yeah it seems familiar but...

- I want to create a scene, where are scenes?
- Nodes? Oh, are those GameObjects?
- Wtf why there are so many nodes?
- How am I supposed to make a player with only one script?
- Ok I made a script, now how do I move the Player?
- My player is not moving, why?
  ...
- Thing in Unity were so simple, why should I switch?

---

## Look...

- I understand your frustration. I've been there, I swear...
- In order to learn Godot, you must understand that Godot is not open-source Unity
- Unity is Unity and Godot is Godot
- But I see you're a busy person, and I don't want to waste your time
- Here we go...

---

## I want to create a scene, where are scenes?

- In Godot there are scenes, but they work differently from Unity
- Godot scenes are a tree of nodes

_So they are like... prefabs?_

- Yes

_Surprised Pikachu face_

- Let me put it like this: scenes in Godot are like Unity scenes, but they can also be be instaced like prefabs

---

## Nodes? Oh, are those GameObjects?

- Yes, _BUT_
- In Unity, **a prefab is a container for Components** _(Transform, SpriteRender, ecc)_
- In Godot, a **node is like a GameObject with one built-in role** _(Sprite2D, Camera2D, ecc)_

---

## Wtf why there are so many nodes?

- You will get used to it, trust me
- Take a look at the complete list of nodes: each one does one and only one thing
  - Node2D is the base class for everything that has a 2D position in the world
  - AnimatedSprite2D is responsible for animating a sprite
  - Line2D is responsible for displaying a line
  - And so on...
- Don't you see the one you're looking for? Make your own!
- Also, you can attach one (ONE!) script to each node to add behaviour

---

## Ok but how am I supposed to make a player with only one script?

You should start to see it by now...

![height:350px](images/dog_enemy.png)

Every node should be a children of the base node

---

## I made a Player script, now how do I move it?

```gdscript
extends CharacterBody2D

@export var speed := 10.0

var _direction := Vector2.RIGHT


func _ready() -> void:
    pass


func _process(delta: float) -> void:
    velocity = _direction * speed * delta
```

---

## My player is not moving, why?

- Let's check the [**CharacterBody2D** documentation](https://docs.godotengine.org/en/stable/classes/class_characterbody2d.html)...

**CharacterBody2D** is a specialized class for physics bodies that are meant to be user-controlled. [...] They are mainly used to provide high-level API to move objects with wall and slope detection **(move_and_slide() method)**

```gdscript
func _process(delta: float) -> void:
    velocity = _direction * speed * delta
    # Added move and slide here
    move_and_slide()
```

---

## Cool! Now I want to shoot, how do I instantiate a projectile?

- Closer to what you would do in **Unity**, actually
- First, go to **Project Settings** > **Input Map** and **add a new action** called `shoot`
- Create a **Character2D node** and call it **Projectile**
- Make sure to assign your **projectile node** to `player_projectile` in the inspector

```gdscript
@export var player_projectile: PackedScene

func _process(delta: float) -> void:
    if Input.is_action_just_pressed("shoot"):
        var projectile = player_projectile.instantiate()
        projectile.global_position = self.global_position
        get_tree().root.add_child(projectile)
```

---

## I wanted to destroy my bullet after a second but... wait, where are Coroutines?

- Introducing the Timer node!

![height:250px](images/timer_node.png)

- You can put the timer on autostart, or start it by calling the `start()` method
- When the timer reaches the end, it will emit the timeout signal

---

## Signal? Is it like... an Event?

- Yes! And you can assign them directly in the editor!

![height:350px](images/signals.png)

- Just double click on the signal you want to assign and it will create a function for you!

---

## That is nice, but I want to bind them by code

- No problem, here's how to do it

```
func _ready() -> void:
    $Timer.timeout.connect(_on_timer_timeout)


func _on_timer_timeout():
    queue_free()
```

- The dollar sign on Timer is used to quickly access nodes in the scene tree by their path (in that case, just its name)
- The queue_free function schedules a node to be removed from the scene safely at the end of the current frame (basically, the equivalent to Destroy() in Unity)

---

## You didn't answered me btw, where are Coroutines?

- You can make every GDScript function async just by adding await inside the function

```
@export var destroy_after := 1.0


func _ready() -> void:
    await get_tree().create_timer(destroy_after, true).timeout
    queue_free()
```

- This snippet creates a timer that, when the timeout is reached, destroys the object that is attached to
- Pretty cool isn't it?
