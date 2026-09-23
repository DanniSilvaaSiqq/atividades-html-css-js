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
    print("Alterações adicionadas ao staging.")

    subprocess.run(
        ["git", "commit", "-m", "Atualiza atividades"]
    )

    print("AutoGit iniciado.")
    
else:
    print("Nenhuma alteração encontrada.")

    