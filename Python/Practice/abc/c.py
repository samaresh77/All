# make a border
def make_border(text, border_char='*'):
    lines = text.split('\n')
    max_length = max(len(line) for line in lines)
    border_line = border_char * (max_length + 4)
    
    bordered_text = [border_line]
    for line in lines:
        bordered_text.append(f"{border_char} {line.ljust(max_length)} {border_char}")
    bordered_text.append(border_line)
    
    return '\n'.join(bordered_text)

# example usage
if __name__ == "__main__":
    sample_text = "Hello, World!\nThis is a sample text."
    print(make_border(sample_text))