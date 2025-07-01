function isPrime(n) {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    const sqrtN = Math.floor(Math.sqrt(n));
    for (let i = 3; i <= sqrtN; i += 2) {
        if (n % i === 0) return false;
    }
    return true;
}

function findGoldbachPair(E) {
    if (E < 4 || E % 2 !== 0) {
        return "Please enter an even number ≥ 4.";
    }

    const t0 = performance.now();

    if (isPrime(E - 2)) {
        const t1 = performance.now();
        return `Goldbach pair: 2 + ${E - 2} = ${E} (Time: ${(t1 - t0).toFixed(3)} ms)`;
    }

    for (let p = 3; p <= E / 2; p += 2) {
        let q = E - p;
        if (isPrime(p) && isPrime(q)) {
            const t1 = performance.now();
            return `Goldbach pair: ${p} + ${q} = ${E} (Time: ${(t1 - t0).toFixed(3)} ms)`;
        }
    }

    return "No Goldbach pair found (this should not happen if Goldbach's Conjecture holds).";
}

function compute() {
    const input = document.getElementById("numberInput").value.trim();
    const E = BigInt(input);

    if (E < 4n || E % 2n !== 0n) {
        document.getElementById("result").innerText = "Please enter an even number ≥ 4.";
        return;
    }

    // For very large numbers, we use Number only if safe
    if (E <= Number.MAX_SAFE_INTEGER) {
        const result = findGoldbachPair(Number(E));
        document.getElementById("result").innerText = result;
    } else {
        document.getElementById("result").innerText = "Number too large (limit: 10^18)";
    }
}
