def encrypt(inputText, N, D):
    if D != -1 and D != 1:
        print("error, invalid D parameter")
        return

    if " " in inputText or "!" in inputText:
        print("error, space or ! is in the input")
        return
    
    shift = N * D
    encrypted = ""

    for letter in reversed(inputText):
        new_letter = (ord(letter) + shift - 34) % 93 + 34

        if new_letter == 34:
            encrypted += "\""
        elif new_letter == 92:
            encrypted += "\\"
        else:
            encrypted += chr(new_letter)

    return encrypted

def decrypt(inputText, N, D):
    if D != -1 and D != 1:
        print("error, invalid D parameter")
        return

    if " " in inputText or "!" in inputText:
        print("error, space or ! is in the input")
        return
    
    shift = N * -1 * D
    decrypted = ""

    for letter in reversed(inputText):
        new_letter = (ord(letter) + shift - 34) % 93 + 34

        if new_letter == 34:
            decrypted += "\""
        elif new_letter == 92:
            decrypted += "\\"
        else:
            decrypted += chr(new_letter)

    if " " in decrypted or "!" in decrypted:
        print("error, space or ! is in the input")
        
    return decrypted