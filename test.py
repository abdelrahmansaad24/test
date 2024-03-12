x = 0

def plus():
    global x  # Declare x as global to modify it
    print(x)
    x += 1  # Increment x
    return x 

if __name__ == "__main__":
    plus()
