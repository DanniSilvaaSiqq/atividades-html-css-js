import subprocess

resultado = subprocess.run(
    ["git", "status", "--porcelain"],
    capture_output=True,
    text=True
)

print(resultado.stdout)