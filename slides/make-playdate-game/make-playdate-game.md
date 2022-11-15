---
marp: true
theme: haskell
---

# Let's make a game for Playdate

**Also called "the Game Boy with a Crank"**

Giorgio Pomettini ([@pomettini](https://github.com/pomettini))

---

# What's in this talk

- Setting up a dev environment
- Lua language overview
- Making a player moving on the screen
- How to use the Crank (duh)
- Where to look for help
- Profit (?)

---

# Brief history

- Announced on May 2019
- Started shipping on April 2022
- $179 (with taxes & shipping = ~€280)

---

# Tech specs

---

# Dev environments

- [Visual Studio Code](https://code.visualstudio.com/) on Windows, Mac and Linux
- [Nova](https://nova.app/) on Mac (recommended)
- Playdate Simulator
- A Playdate (if you have one)

---

# Visual Studio Code setup

- Download the [Playdate extension](https://marketplace.visualstudio.com/items?itemName=Orta.playdate) for Visual Studio Code

---

# Nova setup

---

# Playdate Simulator

Download the [Playdate SDK](https://play.date/dev/)

---

# Hello world!

```lua
print("Hello world!")
```

---

# Brief intro to Lua

---

# Primitives

- Lua is a dynamically typed language
- There are no type definitions in the language; each value carries its own type

```lua
"Hello world"   -- string
10.4            -- number
true            -- boolean
nil             -- nil
print           -- function
```

---

# Functions

* Functions can both carry out a specific task or compute and return values
* A function definition has a conventional syntax; for instance

```lua
function add(a, b)
    return a + b
end

print(add(10, 20))  -- Returns 30
```

* In that syntax, a function definition has a name (add), a list of parameters (a and b), and a body, which is a list of statements

---

# Tables

- The table type implements associative arrays
- An associative array is an array that can be indexed not only with numbers, but also with strings or any other value of the language
- Tables have no fixed size; you can add as many elements as you want to a table dynamically

```lua
-- Create a table and store its reference in `player'
player = {}
player["hp"] = 100
print(player["hp"])     -- Prints 100
print(player.hp)        -- Prints 100 (Same as above)
```

---

# Tables

- Each table may store values with different types of indices and it grows as it needs to accommodate new entries

```lua
a = {}
a[10] = "Hello"
a["x"] = "World"
print(a[10])        -- Prints "Hello"
print(a.x)          -- Prints "World"
print(a[20])        -- Prints nil (undefined)
```

- Table fields evaluate to nil if they are not initialized

---

# Loops

- A numeric for has the following syntax

```lua
for i = 1, 5 do
    print(i)
end

-- Output:

-- 1
-- 2
-- 3
-- 4
-- 5
```

---

# Loops

- The basic Lua library provides `pairs`, a handy function that allows you to iterate over the elements of a table

```lua
a = {}
a[10] = "Hello"
a["x"] = "World"

for key, value in pairs(a) do
    print(key .. " " .. value)  -- Concats strings with ..
end

-- Output:

-- 10 Hello
-- x World
```

---

# Conditionals

---

# Syntax differences

```lua
if a > b then
    -- Do stuff
end
```

```c
if (a > b)
{
    // Do stuff
}
```

---

# Meh things

- One-based indexing (arrays starts at 1)

---

# Loading a Sprite

---

# Moving a sprite

---

# Using the Crank

---

# Classes

---

# Creating a Class

---

# Instancing & Destroying

---

# Documentation

---

# Where to put your game

---

# Useful resources

- [SquidGodDev](https://www.youtube.com/c/SquidGodDev) excellent video tutorials
- [Awesome Playdate](https://github.com/sayhiben/awesome-playdate) crowd-sourced awesomeness
- [/r/PlaydateConsole](https://www.reddit.com/r/PlaydateConsole/) and [/r/PlaydateDeveloper](https://www.reddit.com/r/PlaydateDeveloper/)

---

# Demo

---

# Things I didn't cover (yet)

- Collisions
- Audio
- Accelerometer
- Fonts
- Debugging

But you can find all your answers on [Inside Playdate](https://sdk.play.date/)

---

# Thank you

- Questions?
