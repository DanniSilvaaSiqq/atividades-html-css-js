import subprocess

resultado = subprocess.run(
    ["git", "status", "--porcelain"],
    capture_output=True,
    text=True
)

if resultado.stdout:
    print("Existem alterações no projeto.")
    print(resultado.stdout)

    subprocess.run(["git", "add", "."])
    
else:
    print("Nenhuma alteração encontrada.")