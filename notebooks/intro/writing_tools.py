## These tools are for creating matrices with the annotation tags added automatically

# For generating the latex for t_{in \rightarrow out} matrix
s = ''
for row in range(4):
    for column in range(4):
        c, r = f'{column:02b}', f'{row:02b}'
        s += f'\\class{{t_amp_{c}_{r}}}{{t_{{{c}\\to {r}}}}} & '
    s = s[:-2]
    s += '\\\\\n'
print(s)


# For generating the metadata for t_{in \rightarrow out} matrix
msg = """
    "t_amp_{c}_{r}": {{
      "meaning": "This is the amplitude of this operation transforming the state <code>{c}</code> to <code>{r}</code>."
    }},
"""
s = ''
for row in range(4):
    for column in range(4):
        c, r = f'{column:02b}', f'{row:02b}'
        s += msg.format(c=c, r=r)
s = s[:-2]
print(s)


# For making latex from a matrix
cnot = [[1,0,0,0],
        [0,0,0,1],
        [0,0,1,0],
        [0,1,0,0]]
s = ''
for row in range(4):
    for column in range(4):
        c, r = f'{column:02b}', f'{row:02b}'
        s += f'\\class{{t_amp_{c}_{r}}}{{{cnot[row][column]}}} & '
    s = s[:-2]
    s += '\\\\\n'
print(s)