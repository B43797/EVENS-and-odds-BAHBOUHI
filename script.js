function isPrime(n) {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

function calculate() {
  const start = performance.now();
  const input = document.getElementById("number").value.trim();
  const E = BigInt(input);

  if (E % 2n !== 0n || E < 4n) {
    document.getElementById("result").innerText = "Please enter an even number ≥ 4.";
    return;
  }

  const max = E / 2n;
  let found = false;
  for (let p = 2n; p <= max; p++) {
    const q = E - p;
    if (isPrime(Number(p)) && isPrime(Number(q))) {
      const O = E / 2n;
      let factor = "";
      if (O % p === 0n) factor = `\n→ ${p} is a factor of ${O}`;
      else if (O % q === 0n) factor = `\n→ ${q} is a factor of ${O}`;
      const time = (performance.now() - start).toFixed(2);
      document.getElementById("result").innerText =
        `Goldbach pair: ${p} + ${q} = ${E}\nOdd number O = ${O}${factor}\nTime: ${time} ms`;
      found = true;
      break;
    }
  }

  if (!found) {
    document.getElementById("result").innerText = "No Goldbach pair found.";
  }
}

function copyResult() {
  const text = document.getElementById("result").innerText;
  navigator.clipboard.writeText(text);
}
