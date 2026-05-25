I'll organize both into a structured practice roadmap you can repeatedly use.

# MathJax Practice Roadmap

## Stage 1 — Fundamentals

Topics:

* Inline math: `\( ... \)`
* Display math: `$$ ... $$`
* Superscripts: `^`
* Subscripts: `_`
* Grouping: `{ }`

Tips:

* Use `{}` whenever more than one character belongs together.
* Prefer:

```latex
x^{10}
```

instead of:

```latex
x^10
```

* Prefer:

```latex
a_{12}
```

instead of:

```latex
a_12
```

Tests:

1.

```text
x squared + 4x + 7
```

2.

```text
y cubed − 5y² + 8
```

3.

```text
a subscript 2 + b subscript 3
```

4.

```text
x to power 10 divided by y²
```

5.

```text
square root of x + 9
```

Practice method:

1. Read the sentence.
2. Write MathJax without help.
3. Render in browser.
4. Compare output to intended equation.
5. Rewrite if wrong.

---

## Stage 2 — Fractions and Roots

Topics:

* `\frac{}{}`
* `\sqrt{}`
* `\sqrt[n]{}`

Tips:

* Numerator always goes in first braces:

```latex
\frac{top}{bottom}
```

Tests:

1.

```text
1/2 + 3/4
```

2.

```text
x+y over x−y
```

3.

```text
square root of x²+y²
```

4.

```text
cube root of x+8
```

5.

```text
a+b over c+d
```

Practice:

* Write from English → MathJax
* Reverse it:
  MathJax → English

---

## Stage 3 — Symbols and Operators

Topics:

* `\le`
* `\ge`
* `\neq`
* `\times`
* `\div`
* `\alpha`
* `\beta`
* `\pi`
* `\infty`

Tips:

* Greek letters are usually lowercase:

```latex
\alpha
```

Uppercase:

```latex
\Delta
```

Tests:

1.

```text
x ≤ 10
```

2.

```text
y ≠ 4
```

3.

```text
x approaches infinity
```

4.

```text
alpha + beta = pi
```

5.

```text
x × y + z
```

Practice:

Take equations from textbooks and rewrite in MathJax.

---

## Stage 4 — Calculus

Topics:

* `\lim`
* `\int`
* `\sum`
* `\prod`
* `\partial`

Tips:

* Lower bound:

```latex
_{}
```

* Upper bound:

```latex
^{}
```

Tests:

1.

```text
Limit of x as x approaches infinity
```

2.

```text
Integral from 0 to 2 of x² dx
```

3.

```text
Sum from i=1 to n of i²
```

4.

```text
Product from k=1 to n of k
```

5.

```text
Partial derivative of y with respect to x
```

Practice:

Find formulas in calculus books and convert them manually.

---

## Stage 5 — Advanced Structures

Topics:

* Matrices
* Align
* Cases
* Vectors

Tips:

* `&` separates columns
* `\\` creates new rows

Tests:

Matrix:

```text
1 2
3 4
```

Piecewise:

```text
f(x)=
x² if x<0
0 if x=0
2x if x>0
```

Aligned equations:

```text
2x+4=20
2x=16
x=8
```

Practice:

Take solved math examples and reproduce formatting exactly.

