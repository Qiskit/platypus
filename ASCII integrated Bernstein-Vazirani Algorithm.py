password = input("Password:")

def calculate(character):   
    dec = ord(character)
    binary = bin(dec)
    secretnumber = binary    
    circuit = QuantumCircuit(len(secretnumber)+1,len(secretnumber))
    circuit.h(range(len(secretnumber)))
    circuit.x(len(secretnumber))
    circuit.h(len(secretnumber))
    for ii, yesno in enumerate(reversed(secretnumber)):
       if yesno == '1': 
          circuit.cx(ii, len(secretnumber)) 
    circuit.h(range(len(secretnumber))) 
    circuit.measure(range(len(secretnumber)), range(len(secretnumber)))
    simulator = Aer.get_backend('qasm_simulator')   
    result = execute(circuit, backend = simulator, shots=1).result()  
    counts = result.get_counts()   
    bin_counts = list(counts.keys())[0]    
    decimal = int(bin_counts, 2)  
    ASCII = chr(decimal)   
    calc_result.append(ASCII)

characters = list(password)
calc_result = []
for value in characters:
    solution = calculate(value)
print("calculated input: " + "".join(calc_result))
print("original input = " + password)
