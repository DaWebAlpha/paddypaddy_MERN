
---

# 🧮 MATHJAX MASTERY SERIES — PART 1 (Q1–Q40)

---

# 🔹 MATHJAX BASICS (Q1–Q20)

---

## Q1. Inline math formula

**Task:**
Write a simple inline math formula.

**Hint:**
Use single dollar signs `$...$`

**Master Guide:**
MathJax renders math in web pages using LaTeX syntax.

**Code Idea:**

```latex
The answer is $x = 5$.
```

**Explanation:**
- `$...$`: Wraps inline math. The formula appears within the text line.
- `x = 5`: Plain text and symbols render as mathematical notation.

---

## Q2. Display math formula

**Code Idea:**

```latex
$$x = 5$$
```

**Explanation:**
- `$$...$$`: Creates a centered, standalone equation on its own line.
- Display mode uses larger symbols and more generous spacing.

---

## Q3. Greek letters (lowercase)

**Code Idea:**

```latex
$\alpha, \beta, \gamma, \delta, \epsilon, \theta, \lambda, \mu, \pi, \sigma, \phi, \omega$
```

**Explanation:**
- `\alpha`, `\beta`, etc.: Produce Greek letters.
- Essential for mathematical notation (angles, constants, variables).

---

## Q4. Greek letters (uppercase)

**Code Idea:**

```latex
$\Gamma, \Delta, \Theta, \Lambda, \Pi, \Sigma, \Phi, \Psi, \Omega$
```

**Explanation:**
- Uppercase Greek uses capitalized command names.
- Commonly used for sets, products, and special functions.

---

## Q5. Superscripts (exponents)

**Code Idea:**

```latex
$x^2$
```

**Explanation:**
- `^`: The caret symbol creates superscripts.
- Applies only to the next single character or group.

---

## Q6. Subscripts

**Code Idea:**

```latex
$x_i$
```

**Explanation:**
- `_`: The underscore creates subscripts.
- Used for indices, sequences, and chemical notation.

---

## Q7. Combined superscripts and subscripts

**Code Idea:**

```latex
$x_i^2$
```

**Explanation:**
- You can combine both `^` and `_` on the same symbol.
- Order doesn't matter: `x_i^2` and `x^2_i` produce the same result.

---

## Q8. Grouping with curly braces

**Code Idea:**

```latex
$x^{10}, x_{i^2}, {x^y}^z$
```

**Explanation:**
- `{...}`: Curly braces group symbols together.
- `x^{10}`: Without braces, `x^10` would render as $x^10$ (only the 1 becomes superscript).
- Groups tell MathJax what the superscript/subscript applies to.

---

## Q9. Fractions (frac command)

**Code Idea:**

```latex
$\frac{a}{b}$
```

**Explanation:**
- `\frac{numerator}{denominator}`: Creates a stacked fraction.
- One of the most common commands in mathematical writing.

---

## Q10. Fractions with complex expressions

**Code Idea:**

```latex
$\frac{x^2 + 3x + 2}{x + 1}$
```

**Explanation:**
- Use curly braces to group complex numerators and denominators.
- `\frac` applies to the next two groups only.

---

## Q11. Fractions using over

**Code Idea:**

```latex
${a+1 \over b+1}$
```

**Explanation:**
- `\over`: Alternative fraction syntax. Splits the group it's inside.
- Useful when numerator and denominator are already grouped.

---

## Q12. Square roots

**Code Idea:**

```latex
$\sqrt{x}$
```

**Explanation:**
- `\sqrt{expression}`: Creates a square root with automatic sizing.
- The radical sign grows to fit its argument.

---

## Q13. nth roots

**Code Idea:**

```latex
$\sqrt[3]{x}, \sqrt[n]{x^2 + 1}$
```

**Explanation:**
- `\sqrt[n]{x}`: The optional `[n]` specifies the root index.
- `[3]` creates a cube root, `[n]` a general nth root.

---

## Q14. Parentheses (basic)

**Code Idea:**

```latex
$(x + y), [a + b], \{c + d\}$
```

**Explanation:**
- `()`, `[]`: Standard parentheses and brackets.
- `\{` and `\}`: Curly braces must be escaped with backslash (since `{` and `}` are grouping characters in LaTeX).

---

## Q15. Automatic sizing parentheses

**Code Idea:**

```latex
$\left( \frac{x}{y} \right)$
```

**Explanation:**
- `\left(` and `\right)`: Automatically resize parentheses to fit the content.
- Without them: `(\frac{x}{y})` produces small, ugly parentheses.
- Essential for professional-looking equations with fractions or integrals.

---

## Q16. Various bracket types with auto-sizing

**Code Idea:**

```latex
$\left[ x \right], \left\{ x \right\}, \left| x \right|, \left\langle x \right\rangle$
```

**Explanation:**
- `\left` and `\right` work with: `()`, `[]`, `\{\}`, `|`, `\vert`, `\Vert`, `\langle\rangle`, `\lceil\rceil`, `\lfloor\rfloor`.
- `\langle` and `\rangle`: Angle brackets for inner products.

---

## Q17. Invisible delimiters

**Code Idea:**

```latex
$\left. \frac{1}{2} \right\rbrace$
```

**Explanation:**
- `.` (period): Creates an invisible delimiter.
- Used when you need a `\left` or `\right` on only one side.

---

## Q18. Manual size adjustment

**Code Idea:**

```latex
$\bigl( \Bigl( \biggl( \Biggl( x \Biggr) \biggr) \Bigr) \bigr)$
```

**Explanation:**
- `\big`, `\Big`, `\bigg`, `\Bigg`: Manual size controls with `l` (left) and `r` (right) variants.
- Use when automatic sizing looks wrong or is unavailable.

---

## Q19. Plus, minus, times, divide

**Code Idea:**

```latex
$a + b, a - b, a \times b, a \div b, a / b$
```

**Explanation:**
- Standard operators work directly.
- `\times`: Multiplication cross (×).
- `\div`: Division symbol (÷).

---

## Q20. Plus-minus and minus-plus

**Code Idea:**

```latex
$\pm 5, \mp 3$
```

**Explanation:**
- `\pm`: Plus-minus sign (±). Used in quadratic formula, uncertainties.
- `\mp`: Minus-plus sign (∓). The opposite sign combination.

---

# 🔹 ADVANCED SYMBOLS & OPERATORS (Q21–Q40)

---

## Q21. Sums

**Code Idea:**

```latex
$\sum_{i=1}^n i^2$
```

**Explanation:**
- `\sum`: Summation symbol (Σ).
- Subscript (`_`) = lower limit, superscript (`^`) = upper limit.
- Use braces for multi-character limits: `\sum_{i=1}^{n}`.

---

## Q22. Products

**Code Idea:**

```latex
$\prod_{i=1}^n x_i$
```

**Explanation:**
- `\prod`: Product symbol (Π).
- Similar syntax to summation.
- Used for multiplying sequences of terms.

---

## Q23. Integrals

**Code Idea:**

```latex
$\int_a^b f(x)\,dx$
```

**Explanation:**
- `\int`: Integral symbol (∫).
- `\,`: Thin space before `dx` for proper spacing (convention).
- Limits `a` (lower) and `b` (upper).

---

## Q24. Multiple integrals

**Code Idea:**

```latex
$\iint_D f(x,y)\,dx\,dy, \iiint_V f(x,y,z)\,dx\,dy\,dz$
```

**Explanation:**
- `\iint`: Double integral, `\iiint`: Triple integral.
- `\idotsint`: Multiple integrals with dots.

---

## Q25. Limits

**Code Idea:**

```latex
$\lim_{x \to 0} \frac{\sin x}{x}$
```

**Explanation:**
- `\lim`: Limit operator (typeset in roman font, not italic).
- `\to`: Right arrow (→) for "approaches".
- Subscript shows what variable approaches what value.

---

## Q26. Limits with text underneath

**Code Idea:**

```latex
$\lim\limits_{x \to \infty} f(x)$
```

**Explanation:**
- `\limits`: Forces the subscript to appear directly under the operator (not beside it).
- `\infty`: Infinity symbol (∞).

---

## Q27. Big union and intersection

**Code Idea:**

```latex
$\bigcup_{i=1}^n A_i, \bigcap_{i=1}^n B_i$
```

**Explanation:**
- `\bigcup`: Union over a collection (∪ with limits).
- `\bigcap`: Intersection over a collection (∩ with limits).
- Common in set theory.

---

## Q28. Special functions

**Code Idea:**

```latex
$\sin x, \cos x, \tan x, \log x, \ln x, \exp x, \max(a,b), \min(a,b)$
```

**Explanation:**
- `\sin`, `\cos`, etc.: Typeset function names in roman font.
- Without backslash: `sin x` renders as $sin x$ (wrong—looks like variables s, i, n multiplied).
- Always use backslash for named functions.

---

## Q29. Custom operators

**Code Idea:**

```latex
$\operatorname{arsinh}(x), \operatorname*{Res}_{z=1} f(z)$
```

**Explanation:**
- `\operatorname{...}`: Creates custom operator names in roman font.
- `\operatorname*{...}`: With limits above and below (like `\lim`).

---

## Q30. Infinity and empty set

**Code Idea:**

```latex
$\infty, \emptyset, \varnothing$
```

**Explanation:**
- `\infty`: Infinity symbol.
- `\emptyset` or `\varnothing`: Empty set symbol (∅).
- `\varnothing`: Variant empty set symbol.

---

## Q31. Partial derivatives

**Code Idea:**

```latex
$\frac{\partial f}{\partial x}, \frac{\partial^2 f}{\partial x^2}$
```

**Explanation:**
- `\partial`: Partial derivative symbol (∂).
- Used for multivariable calculus.

---

## Q32. Nabla and gradient

**Code Idea:**

```latex
$\nabla f, \nabla \cdot \mathbf{F}, \nabla \times \mathbf{F}$
```

**Explanation:**
- `\nabla`: Nabla/del operator (∇).
- `\cdot`: Dot product, `\times`: Cross product.
- Used in vector calculus.

---

## Q33. Comparison operators

**Code Idea:**

```latex
$a < b, a > b, a \le b, a \ge b, a \neq b, a \approx b, a \equiv b$
```

**Explanation:**
- `\le`: Less than or equal (≤), `\ge`: Greater than or equal (≥).
- `\neq`: Not equal (≠), `\approx`: Approximately equal (≈).
- `\equiv`: Equivalent or congruent (≡).

---

## Q34. Logical operators

**Code Idea:**

```latex
$a \land b, a \lor b, \neg a, a \implies b, a \iff b$
```

**Explanation:**
- `\land`: Logical AND (∧), `\lor`: Logical OR (∨).
- `\neg`: Negation (¬), `\implies`: Implies (⇒), `\iff`: If and only if (⇔).

---

## Q35. Set membership

**Code Idea:**

```latex
$x \in A, x \notin A, A \subset B, A \subseteq B, A \supset B$
```

**Explanation:**
- `\in`: Element of (∈), `\notin`: Not element of (∉).
- `\subset`: Proper subset (⊂), `\subseteq`: Subset or equal (⊆).
- `\supset`: Superset (⊃).

---

## Q36. Set operations

**Code Idea:**

```latex
$A \cup B, A \cap B, A \setminus B, A \triangle B$
```

**Explanation:**
- `\cup`: Union (∪), `\cap`: Intersection (∩).
- `\setminus`: Set difference (\), `\triangle`: Symmetric difference (△).

---

## Q37. Quantifiers

**Code Idea:**

```latex
$\forall x \in \mathbb{R}, \exists y \in \mathbb{R}$
```

**Explanation:**
- `\forall`: For all (∀), `\exists`: There exists (∃).
- Fundamental symbols for mathematical logic and proofs.

---

## Q38. Dots and ellipsis

**Code Idea:**

```latex
$a_1, a_2, \ldots, a_n \quad \text{vs} \quad a_1 + a_2 + \cdots + a_n$
```

**Explanation:**
- `\ldots`: Low dots for lists (baseline, like commas).
- `\cdots`: Centered dots for operations (like +, -, =).
- `\vdots`: Vertical dots, `\ddots`: Diagonal dots.

---

## Q39. Spacing commands

**Code Idea:**

```latex
$a\,b \quad a\;b \quad a\quad b \quad a\qquad b$
```

**Explanation:**
- `\,`: Thin space, `\;`: Medium space.
- `\quad`: 1em space, `\qquad`: 2em space.
- MathJax ignores literal spaces; use these commands for precise spacing.

---

## Q40. Text inside math

**Code Idea:**

```latex
$f(x) = x^2 \text{ for all } x \in \mathbb{R}$
```

**Explanation:**
- `\text{...}`: Renders plain text inside math mode.
- Without it, words are treated as variables and italicized.
- You can even nest `$...$` inside `\text{...}` for math-within-text-within-math.

---

# 🧮 MATHJAX MASTERY SERIES — PART 2 (Q41–Q80)

---

# 🔹 MATRICES & ALIGNMENT (Q41–Q60)

---

## Q41. Basic matrix

**Task:**
Create a simple 3×3 matrix.

**Hint:**
Use `matrix` environment

**Code Idea:**

```latex
$$
\begin{matrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9
\end{matrix}
$$
```

**Explanation:**
- `\begin{matrix}...\end{matrix}`: Creates a matrix.
- `&`: Separates columns.
- `\\`: Ends a row and starts a new one.

---

## Q42. Matrix with parentheses (pmatrix)

**Code Idea:**

```latex
$$
\begin{pmatrix}
1 & 2 \\
3 & 4
\end{pmatrix}
$$
```

**Explanation:**
- `pmatrix`: Matrix with round parentheses ().
- `bmatrix`: Square brackets [], `Bmatrix`: Curly braces {}.
- `vmatrix`: Single vertical bars ||, `Vmatrix`: Double vertical bars ||||.

---

## Q43. Matrix with dots

**Code Idea:**

```latex
$$
\begin{pmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn}
\end{pmatrix}
$$
```

**Explanation:**
- `\cdots`: Horizontal dots for continuation.
- `\vdots`: Vertical dots, `\ddots`: Diagonal dots (for the main diagonal).
- Standard pattern for general matrix notation.

---

## Q44. Augmented matrix

**Code Idea:**

```latex
$$
\left[
\begin{array}{cc|c}
1 & 2 & 3 \\
4 & 5 & 6
\end{array}
\right]
$$
```

**Explanation:**
- `array` environment with column specifiers: `{cc|c}` means two centered columns, then a vertical bar, then one centered column.
- `\left[` and `\right]`: Auto-sized brackets around the array.

---

## Q45. Column alignment in arrays

**Code Idea:**

```latex
$$
\begin{array}{lcr}
\text{Left} & \text{Center} & \text{Right} \\
1 & 2 & 3 \\
10 & 20 & 30
\end{array}
$$
```

**Explanation:**
- `{lcr}`: Left, Center, Right alignment specifiers.
- `array` is more flexible than `matrix` for custom formatting.

---

## Q46. Horizontal lines in arrays

**Code Idea:**

```latex
$$
\begin{array}{ccc}
\hline
a & b & c \\
\hline
d & e & f \\
\hline
\end{array}
$$
```

**Explanation:**
- `\hline`: Draws a horizontal line across all columns.
- `\hdashline`: Dashed horizontal line (requires `arydshln` package in full LaTeX; may vary in MathJax).

---

## Q47. Vertical alignment and spacing

**Code Idea:**

```latex
$$
\begin{array}{c|c|c}
a & b & c \\
\cline{1-1}
d & e & f \\
\cline{2-3}
g & h & i
\end{array}
$$
```

**Explanation:**
- `\cline{n-m}`: Partial horizontal line from column n to column m.
- Useful for partitioning matrices or creating tables.

---

## Q48. Small matrices in text

**Code Idea:**

```latex
A $2\times2$ matrix $\bigl(\begin{smallmatrix} a & b \\ c & d \end{smallmatrix}\bigr)$ in text.
```

**Explanation:**
- `smallmatrix`: Creates a smaller matrix for inline use.
- Must wrap with manual sizing delimiters since `\left`/`\right` doesn't work well inline.

---

## Q49. Aligned equations (align)

**Code Idea:**

```latex
$$
\begin{align}
x + y &= 5 \\
2x - y &= 1
\end{align}
$$
```

**Explanation:**
- `align`: Aligns equations at the `&` symbol (usually placed before `=`).
- Each line is numbered automatically in full LaTeX (can be suppressed with `align*`).
- `\\` separates lines.

---

## Q50. Multiline equations with split

**Code Idea:**

```latex
$$
\begin{split}
a &= b + c + d \\
  &\quad + e + f + g \\
  &= h + i
\end{split}
$$
```

**Explanation:**
- `split`: Single equation number for the whole block.
- `&`: Alignment point, `\\`: Line break.
- `\quad`: Adds indentation for continuation lines.

---

## Q51. Cases (piecewise functions)

**Code Idea:**

```latex
$$
f(x) = 
\begin{cases}
x^2 & \text{if } x \ge 0 \\
-x & \text{if } x < 0
\end{cases}
$$
```

**Explanation:**
- `cases`: Standard for piecewise definitions.
- `&`: Separates the formula from the condition.
- `\text{...}`: For the "if" text.

---

## Q52. Numbered equations

**Code Idea:**

```latex
$$
E = mc^2 \tag{1}
$$
```

**Explanation:**
- `\tag{number}`: Manually assigns an equation number.
- `\tag*{}`: Tag without parentheses.

---

## Q53. Gathered equations

**Code Idea:**

```latex
$$
\begin{gathered}
a = b + c \\
d = e + f + g \\
h = i
\end{gathered}
$$
```

**Explanation:**
- `gathered`: Centers multiple equations without alignment.
- No `&` needed since there's no alignment point.
- Compact way to group related equations.

---

## Q54. Equation arrays with spacing

**Code Idea:**

```latex
$$
\begin{array}{r@{}l}
\sin(x) = & x - \frac{x^3}{3!} + \frac{x^5}{5!} \\
          & - \frac{x^7}{7!} + \cdots
\end{array}
$$
```

**Explanation:**
- `@{}`: Removes space between columns.
- `r@{}l`: Right-aligned first column, left-aligned second, with zero space between.
- Creates perfect alignment for multi-line formulas.

---

## Q55. Underbraces and overbraces

**Code Idea:**

```latex
$$
\underbrace{a + b + c}_{\text{sum}} = \overbrace{d + e + f}^{\text{total}}
$$
```

**Explanation:**
- `\underbrace{...}_{label}`: Brace underneath with subscript label.
- `\overbrace{...}^{label}`: Brace above with superscript label.
- Great for annotating parts of equations.

---

## Q56. Under/over lines and arrows

**Code Idea:**

```latex
$$
\underline{a + b}, \overline{xyz}, \overrightarrow{AB}, \overleftarrow{BA}
$$
```

**Explanation:**
- `\underline`, `\overline`: Lines under/over expressions.
- `\overrightarrow`, `\overleftarrow`: Arrows over expressions.
- `\widehat{xy}`: Wide hat over multiple characters.

---

## Q57. Stacked subscripts and superscripts

**Code Idea:**

```latex
$$
\sum_{\substack{i=1 \\ i \neq j}}^n a_i
$$
```

**Explanation:**
- `\substack{...}`: Stacks multiple lines in subscripts/superscripts.
- `\\` separates lines within the substack.
- Useful for complex conditions under operators.

---

## Q58. Limits as operators

**Code Idea:**

```latex
$$
\lim_{x \to 0} \frac{\sin x}{x} = 1, \quad \lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n = e
$$
```

**Explanation:**
- Standard limit definitions.
- `\to` for the arrow, subscripts for the approach value.

---

## Q59. Big O and asymptotic notation

**Code Idea:**

```latex
$$
f(n) = O(n^2), \quad f(n) = \Theta(n \log n), \quad f(n) = o(n)
$$
```

**Explanation:**
- `O`, `\Theta`, `o`: Asymptotic notation symbols.
- Typeset as regular text (not italic) for readability.

---

## Q60. Continued fractions

**Code Idea:**

```latex
$$
\cfrac{1}{a + \cfrac{1}{b + \cfrac{1}{c}}}
$$
```

**Explanation:**
- `\cfrac`: Continued fraction (centers each fraction level).
- `\frac` would shrink too much at each nesting level.
- `\cfrac` maintains readable size throughout.

---

# 🔹 FONTS, STYLES & ADVANCED NOTATION (Q61–Q80)

---

## Q61. Blackboard bold (number sets)

**Code Idea:**

```latex
$\mathbb{N}, \mathbb{Z}, \mathbb{Q}, \mathbb{R}, \mathbb{C}$
```

**Explanation:**
- `\mathbb{...}`: Blackboard bold font (double-struck).
- Standard for number sets: Naturals, Integers, Rationals, Reals, Complex.
- Only works with uppercase letters in most MathJax configurations.

---

## Q62. Bold math

**Code Idea:**

```latex
$\mathbf{A}, \mathbf{v}, \boldsymbol{\alpha}$
```

**Explanation:**
- `\mathbf{...}`: Bold roman math.
- `\boldsymbol{...}`: Bold italic for symbols and Greek letters.
- Used for vectors and matrices.

---

## Q63. Calligraphic letters

**Code Idea:**

```latex
$\mathcal{A}, \mathcal{B}, \mathcal{C}, \mathcal{F}, \mathcal{L}$
```

**Explanation:**
- `\mathcal{...}`: Calligraphic/script font.
- Common for collections of sets, function spaces, or operators.
- Only uppercase typically available.

---

## Q64. Script and Fraktur fonts

**Code Idea:**

```latex
$\mathscr{A}, \mathfrak{a}, \mathfrak{F}$
```

**Explanation:**
- `\mathscr{...}`: Script letters (requires `mathscr` extension in some MathJax configs).
- `\mathfrak{...}`: Fraktur/Gothic letters (old German style).
- Used for Lie algebras, ideals, and special mathematical objects.

---

## Q65. Roman and sans-serif fonts

**Code Idea:**

```latex
$\mathrm{d}x, \mathsf{Data}, \mathtt{code}$
```

**Explanation:**
- `\mathrm{...}`: Roman (upright) font—use for "d" in derivatives and units.
- `\mathsf{...}`: Sans-serif font.
- `\mathtt{...}`: Typewriter/monospace font.

---

## Q66. Math within text

**Code Idea:**

```latex
The function $f(x) = x^2$ is continuous for all $x \in \mathbb{R}$.
```

**Explanation:**
- Seamlessly mix math and text.
- Keep inline math simple; use display mode for complex expressions.

---

## Q67. Displayed formulas with punctuation

**Code Idea:**

```latex
$$
E = mc^2.
$$
```

**Explanation:**
- Punctuation after display equations goes on the same line.
- Some style guides put punctuation inside the math, some outside.

---

## Q68. Stacking symbols

**Code Idea:**

```latex
$$
\stackrel{\text{def}}{=}, \overset{\Delta}{=}, \underset{x \to 0}{\lim}
$$
```

**Explanation:**
- `\stackrel{top}{bottom}`: Places one symbol above another.
- `\overset`, `\underset`: More flexible alternatives.
- Used for definitions, annotations, and labeled relations.

---

## Q69. Cancel and strike-through

**Code Idea:**

```latex
$$
\cancel{a + b}, \bcancel{x}, \xcancel{y}, \not\equiv
$$
```

**Explanation:**
- `\cancel{...}`: Diagonal strike-through.
- `\bcancel`: Backward slash, `\xcancel`: Cross-out.
- `\not\equiv`: Negation slash over symbol.

---

## Q70. Color in math

**Code Idea:**

```latex
$$
\color{red}{x^2} + \color{blue}{y^2} = \color{green}{z^2}
$$
```

**Explanation:**
- `\color{color}{expression}`: Colors math expressions.
- Standard colors: red, blue, green, black, white, cyan, magenta, yellow.
- Useful for highlighting and step-by-step explanations.

---

## Q71. Boxed formulas

**Code Idea:**

```latex
$$
\boxed{E = mc^2}
$$
```

**Explanation:**
- `\boxed{...}`: Draws a box around an expression.
- Great for emphasizing final answers or important results.

---

## Q72. Sizing delimiters manually

**Code Idea:**

```latex
$$
\Biggl( \biggl( \Bigl( \bigl( (x) \bigr) \Bigr) \biggr) \Biggr)
$$
```

**Explanation:**
- `\big`, `\Big`, `\bigg`, `\Bigg`: Four manual sizes.
- `l` and `r` variants ensure proper spacing.
- Use when automatic sizing fails or looks bad.

---

## Q73. Middle delimiters

**Code Idea:**

```latex
$$
\left\langle q \middle\| \frac{x}{y} \middle| p \right\rangle
$$
```

**Explanation:**
- `\middle`: Creates a delimiter that scales with `\left` and `\right`.
- Useful for inner products, set-builder notation with conditions.

---

## Q74. Phantom spacing

**Code Idea:**

```latex
$$
\sum_{i=1}^n i = \phantom{\sum_{i=1}^n} \frac{n(n+1)}{2}
$$
```

**Explanation:**
- `\phantom{...}`: Invisible box with the width/height of its argument.
- Used for alignment and spacing control.
- `\vphantom`: Height only, `\hphantom`: Width only.

---

## Q75. Smash and llap/rlap

**Code Idea:**

```latex
$$
\mathrlap{\,/}{=} \quad \mathclap{\text{wide text}}
$$
```

**Explanation:**
- `\mathrlap`: Overlays content with zero width to the right.
- `\mathllap`: Zero width to the left.
- `\mathclap`: Zero width on both sides (centers).
- Advanced spacing for complex overlays.

---

## Q76. Tensor notation

**Code Idea:**

```latex
$$
T^{\alpha\beta}{}_{\gamma\delta}, \quad g_{\mu\nu}, \quad \Gamma^\lambda{}_{\mu\nu}
$$
```

**Explanation:**
- `{}` after superscripts ensures proper spacing for mixed indices.
- Critical for general relativity and tensor calculus.
- Order matters: `T^{ab}{}_{cd}{}^{e}` for alternating up/down indices.

---

## Q77. Commutative diagrams (basic)

**Code Idea:**

```latex
$$
\begin{array}{ccc}
A & \xrightarrow{f} & B \\
\downarrow{g} & & \downarrow{h} \\
C & \xrightarrow{k} & D
\end{array}
$$
```

**Explanation:**
- Basic commutative diagram using `array`.
- `\xrightarrow{label}`: Arrow with label above.
- `\downarrow`: Vertical arrow.

---

## Q78. Chemical equations (mhchem)

**Code Idea:**

```latex
$\ce{H2O + CO2 <=> H2CO3}$
```

**Explanation:**
- `\ce{...}`: Requires `mhchem` extension in MathJax.
- Simplified syntax for chemical formulas and equations.
- `<=>`: Equilibrium arrow.

---

## Q79. Physics notation

**Code Idea:**

```latex
$$
\hat{H}\psi = E\psi, \quad \langle x | p \rangle = \frac{1}{\sqrt{2\pi\hbar}} e^{ipx/\hbar}
$$
```

**Explanation:**
- `\hat{...}`: Operator notation (quantum mechanics).
- `\hbar`: Reduced Planck constant (ℏ).
- `\langle...\rangle`: Bra-ket notation.

---

## Q80. Equation numbering and references

**Code Idea:**

```latex
$$
E = mc^2 \tag{Einstein}
$$
```

**Explanation:**
- `\tag{label}`: Custom equation tags.
- `\label{}` and `\eqref{}`: For cross-referencing (in full LaTeX documents).
- MathJax supports basic tagging but reference management varies by platform.

---

# 🧮 MATHJAX MASTERY SERIES — PART 3 (Q81–Q120)

---

# 🔹 ADVANCED STRUCTURES & SPECIALIZED NOTATION (Q81–Q100)

---

## Q81. Arrows and mappings

**Task:**
Write various types of mathematical arrows.

**Hint:**
Use `\to`, `\mapsto`, `\implies`

**Code Idea:**

```latex
$f: A \to B, \quad x \mapsto x^2, \quad P \implies Q, \quad P \iff Q$
```

**Explanation:**
- `\to`: Function arrow (→).
- `\mapsto`: Element mapping (↦).
- `\implies`: Logical implication (⇒), `\iff`: Equivalence (⇔).

---

## Q82. Long arrows with labels

**Code Idea:**

```latex
$$
A \xrightarrow{f} B \xleftarrow{g} C \xleftrightarrow{h} D
$$
```

**Explanation:**
- `\xrightarrow{label}`: Arrow with superscript label.
- `\xleftarrow{label}`: Left arrow with label.
- `\xleftrightarrow{label}`: Bidirectional arrow.

---

## Q83. Harpoons and special arrows

**Code Idea:**

```latex
$$
A \rightharpoonup B, \quad A \leftharpoondown B, \quad A \rightleftharpoons B
$$
```

**Explanation:**
- `\rightharpoonup`, `\leftharpoondown`: Single harpoons.
- `\rightleftharpoons`: Equilibrium harpoon (common in chemistry).
- `\upharpoonleft`, `\downharpoonright`: Vertical variants.

---

## Q84. Extensible arrows

**Code Idea:**

```latex
$$
A \xRightarrow{\text{long label}} B
$$
```

**Explanation:**
- `\xRightarrow{...}`: Double arrow with label (stretches to fit).
- `\xLeftarrow`, `\xLeftrightarrow`: Left and bidirectional variants.
- `\xhookrightarrow`, `\xtwoheadrightarrow`: Hooked and surjective arrows.

---

## Q85. Relations and binary operators

**Code Idea:**

```latex
$a \sim b, \quad a \simeq b, \quad a \cong b, \quad a \propto b, \quad a \perp b, \quad a \parallel b$
```

**Explanation:**
- `\sim`: Similar (~), `\simeq`: Asymptotically equal (≃).
- `\cong`: Congruent (≅), `\propto`: Proportional (∝).
- `\perp`: Perpendicular (⊥), `\parallel`: Parallel (∥).

---

## Q86. Additional binary operators

**Code Idea:**

```latex
$a \oplus b, \quad a \otimes c, \quad a \odot d, \quad a \ominus e$
```

**Explanation:**
- `\oplus`: Direct sum (⊕), `\otimes`: Tensor product (⊗).
- `\odot`: Hadamard/Schur product (⊙), `\ominus`: Set minus (⊖).

---

## Q87. Floor and ceiling functions

**Code Idea:**

```latex
$\lfloor x \rfloor, \quad \lceil x \rceil, \quad \lfloor x \rceil$
```

**Explanation:**
- `\lfloor...\rfloor`: Floor function (greatest integer ≤ x).
- `\lceil...\rceil`: Ceiling function (smallest integer ≥ x).
- `\lfloor...\rceil`: Nearest integer function.

---

## Q88. Absolute value and norms

**Code Idea:**

```latex
$|x|, \quad \|v\|, \quad \left\| \frac{x}{y} \right\|$
```

**Explanation:**
- `|...|`: Absolute value (use `\vert` for spacing control).
- `\|...\|`: Norm (double bars).
- Always use `\left` and `\right` for auto-sizing with fractions.

---

## Q89. Binomial coefficients

**Code Idea:**

```latex
$\binom{n}{k}, \quad \dbinom{n}{k}, \quad \tbinom{n}{k}$
```

**Explanation:**
- `\binom{n}{k}`: Binomial coefficient (n choose k).
- `\dbinom`: Display style (larger), `\tbinom`: Text style (smaller).
- Used in combinatorics and binomial theorem.

---

## Q90. Multinomial and stacked fractions

**Code Idea:**

```latex
$$
\binom{n}{k_1, k_2, k_3} = \frac{n!}{k_1! \, k_2! \, k_3!}
$$
```

**Explanation:**
- `\binom` with multiple entries in the lower position.
- `\,`: Thin spaces between factorials for readability.

---

## Q91. Modulo operations

**Code Idea:**

```latex
$a \bmod b, \quad a \pmod{m}, \quad a \equiv b \pmod{m}$
```

**Explanation:**
- `\bmod`: Binary mod operator.
- `\pmod{m}`: Parenthesized mod with space before it.
- Standard for congruence relations in number theory.

---

## Q92. Stackrel and buildrel

**Code Idea:**

```latex
$$
a \stackrel{\text{def}}{=} b, \quad f(x) \stackrel{x \to 0}{\longrightarrow} L
$$
```

**Explanation:**
- `\stackrel{top}{base}`: Places the top argument above the base.
- `\buildrel...\over...`: Lower-level alternative.
- Used for definitions, limits with annotations.

---

## Q93. Overset and underset

**Code Idea:**

```latex
$$
\overset{?}{=}, \quad \underset{i=1}{\bigcup}, \quad \overset{\circ}{A}
$$
```

**Explanation:**
- `\overset{...}{...}`: Places content above a symbol.
- `\underset{...}{...}`: Places content below.
- `\overset{\circ}{A}`: Interior of set A.

---

## Q94. Sideset for large operators

**Code Idea:**

```latex
$$
\sideset{_a^b}{_c^d}{\sum} e
$$
```

**Explanation:**
- `\sideset{left}{right}{operator}`: Adds scripts to both sides of large operators.
- Useful for specialized notation in advanced algebra.

---

## Q95. Subarray in limits

**Code Idea:**

```latex
$$
\sum_{\begin{subarray}{l} i \in I \\ i > 0 \end{subarray}} a_i
$$
```

**Explanation:**
- `subarray`: Like `substack` but with alignment option (`l`, `c`, `r`).
- More control over multi-line subscripts.

---

## Q96. Intertext in aligned equations

**Code Idea:**

```latex
$$
\begin{align}
a &= b + c \\
\intertext{and therefore}
d &= e + f
\end{align}
$$
```

**Explanation:**
- `\intertext{...}`: Inserts text between aligned equations.
- Maintains alignment context across the text break.

---

## Q97. Shoveright and shoveleft

**Code Idea:**

```latex
$$
\begin{multline}
\text{First line aligned left} \\
\text{Middle lines centered} \\
\shoveright{\text{Last line forced right}}
\end{multline}
$$
```

**Explanation:**
- `multline`: First line left, last line right, middle centered.
- `\shoveright`, `\shoveleft`: Force alignment of specific middle lines.

---

## Q98. Tagging and labels

**Code Idea:**

```latex
$$
a = b \tag{$*$} \label{eq:star}
$$
```

**Explanation:**
- `\tag{...}`: Custom equation tag.
- `\label{...}`: For cross-referencing (platform-dependent in MathJax).
- `\eqref{...}`: Reference a labeled equation.

---

## Q99. Boxes and framing

**Code Idea:**

```latex
$$
\fbox{$x = 5$}, \quad \boxed{\int_a^b f(x)\,dx = F(b) - F(a)}
$$
```

**Explanation:**
- `\fbox{...}`: Frame box (works in text and math).
- `\boxed{...}`: Math-specific framing (better spacing).
- Use for highlighting important results.

---

## Q100. Custom spacing and struts

**Code Idea:**

```latex
$$
a \mathstrut b, \quad a \smash[b]{x^2} c
$$
```

**Explanation:**
- `\mathstrut`: Invisible vertical strut for uniform height.
- `\smash{...}`: Removes height/depth of content.
- `\smash[b]{...}`: Smashes depth only, `\smash[t]{...}`: Smashes height only.

---

# 🔹 SPECIALIZED DOMAINS & EXPERT TECHNIQUES (Q101–Q120)

---

## Q101. Probability and statistics notation

**Task:**
Write common probability symbols.

**Hint:**
Use `\Pr`, `\mathbb{E}`, `\mathbb{P}`, `\Var`, `\Cov`

**Code Idea:**

```latex
$\Pr(A), \quad \mathbb{E}[X], \quad \mathbb{P}(X=x), \quad \Var(X), \quad \Cov(X,Y)$
```

**Explanation:**
- `\Pr`: Probability operator (roman font).
- `\mathbb{E}`: Expected value (blackboard bold E).
- `\Var`, `\Cov`: Variance and covariance operators.

---

## Q102. Conditional probability and expectation

**Code Idea:**

```latex
$$
\mathbb{E}[X \mid Y=y], \quad \Pr(A \mid B) = \frac{\Pr(A \cap B)}{\Pr(B)}
$$
```

**Explanation:**
- `\mid`: Conditional bar (proper spacing).
- `\mathbb{E}[... \mid ...]`: Standard conditional expectation notation.

---

## Q103. Statistical distributions

**Code Idea:**

```latex
$X \sim \mathcal{N}(\mu, \sigma^2), \quad Y \sim \chi^2(k), \quad Z \sim t(n)$
```

**Explanation:**
- `\sim`: Distributed as.
- `\mathcal{N}`: Normal distribution (calligraphic N).
- `\chi^2`: Chi-squared distribution.

---

## Q104. Estimators and hats

**Code Idea:**

```latex
$\hat{\mu}, \quad \hat{\sigma}^2, \quad \widehat{\text{bias}}, \quad \bar{X}, \quad \tilde{\beta}$
```

**Explanation:**
- `\hat{...}`: Estimator/hat notation.
- `\widehat{...}`: Wide hat for multiple characters.
- `\bar{...}`: Sample mean, `\tilde{...}`: Alternative estimator.

---

## Q105. Information theory

**Code Idea:**

```latex
$H(X) = -\sum p(x) \log p(x), \quad I(X;Y) = H(X) - H(X \mid Y)$
```

**Explanation:**
- `H(X)`: Shannon entropy.
- `I(X;Y)`: Mutual information.
- `D_{KL}(P \| Q)`: Kullback-Leibler divergence.

---

## Q106. Game theory notation

**Code Idea:**

```latex
$\sigma_i(s_i), \quad BR_i(s_{-i}), \quad u_i(s), \quad \Delta(S_i)$
```

**Explanation:**
- `\sigma`: Strategy profile.
- `s_{-i}`: Strategy of all players except i.
- `BR`: Best response, `u`: Utility function.
- `\Delta(S)`: Set of probability distributions over S.

---

## Q107. Category theory arrows

**Code Idea:**

```latex
$f: A \to B, \quad F: \mathcal{C} \to \mathcal{D}, \quad \eta: F \Rightarrow G$
```

**Explanation:**
- `\to`: Morphism arrow.
- `\Rightarrow`: Natural transformation (double arrow).
- `\mathcal{C}`: Categories in calligraphic font.

---

## Q108. Type theory and logic

**Code Idea:**

```latex
$\Gamma \vdash t : T, \quad \lambda x : A.\,B, \quad \Pi_{x:A} B(x)$
```

**Explanation:**
- `\vdash`: Turnstile (proves/entails).
- `\lambda`: Lambda abstraction.
- `\Pi`: Dependent product type.

---

## Q109. Algorithm and complexity notation

**Code Idea:**

```latex
$O(n^2), \quad \Omega(n), \quad \Theta(n \log n), \quad \mathcal{P}, \quad \mathcal{NP}$
```

**Explanation:**
- `O`, `\Omega`, `\Theta`: Big-O, Big-Omega, Big-Theta.
- `\mathcal{P}`, `\mathcal{NP}`: Complexity classes.

---

## Q110. Number theory notation

**Code Idea:**

```latex
$a \mid b, \quad a \nmid b, \quad \gcd(a,b), \quad \operatorname{lcm}(a,b), \quad \varphi(n)$
```

**Explanation:**
- `\mid`: Divides (| with proper spacing).
- `\nmid`: Does not divide.
- `\gcd`, `\operatorname{lcm}`: Greatest common divisor, least common multiple.
- `\varphi`: Euler's totient function.

---

## Q111. Geometry notation

**Code Idea:**

```latex
$\angle ABC, \quad \triangle ABC, \quad \square ABCD, \quad \overline{AB}, \quad \overrightarrow{AB}$
```

**Explanation:**
- `\angle`: Angle symbol.
- `\triangle`: Triangle symbol.
- `\square`: Square symbol (may need `\Box` or package).
- `\overline`, `\overrightarrow`: Line segments and rays.

---

## Q112. Calculus notation

**Code Idea:**

```latex
$$
\frac{dy}{dx}, \quad \frac{\partial z}{\partial x}, \quad \int_a^b f(x)\,dx, \quad \oint_C \mathbf{F} \cdot d\mathbf{r}
$$
```

**Explanation:**
- `\frac{dy}{dx}`: Ordinary derivative.
- `\frac{\partial z}{\partial x}`: Partial derivative.
- `\oint`: Closed line integral.
- `\cdot`: Dot product for line integrals.

---

## Q113. Differential forms

**Code Idea:**

```latex
$dx \wedge dy, \quad d\omega, \quad \iint_S \mathbf{F} \cdot d\mathbf{S}$
```

**Explanation:**
- `\wedge`: Wedge product for differential forms.
- `d\omega`: Exterior derivative.
- `\iint_S`: Surface integral over S.

---

## Q114. Series and sequences

**Code Idea:**

```latex
$$
\sum_{n=1}^\infty a_n, \quad \prod_{n=1}^\infty b_n, \quad \lim_{n \to \infty} s_n = S
$$
```

**Explanation:**
- `\sum_{n=1}^\infty`: Infinite series.
- `\prod`: Infinite product.
- `\lim_{n \to \infty}`: Limit of sequence.

---

## Q115. Fourier and transform notation

**Code Idea:**

```latex
$$
\hat{f}(\xi) = \int_{-\infty}^{\infty} f(x) e^{-2\pi i x \xi}\,dx
$$
```

**Explanation:**
- `\hat{f}`: Fourier transform.
- `\int_{-\infty}^{\infty}`: Integral over entire real line.
- Standard Fourier transform definition.

---

## Q116. Linear algebra notation

**Code Idea:**

```latex
$\det(A), \quad \operatorname{tr}(A), \quad \operatorname{rank}(A), \quad \ker(T), \quad \operatorname{im}(T)$
```

**Explanation:**
- `\det`: Determinant.
- `\operatorname{tr}`: Trace.
- `\operatorname{rank}`: Rank.
- `\ker`, `\operatorname{im}`: Kernel and image of linear transformation.

---

## Q117. Inner products and norms

**Code Idea:**

```latex
$\langle u, v \rangle, \quad \|v\|_2, \quad \|A\|_F, \quad \|f\|_{L^p}$
```

**Explanation:**
- `\langle...\rangle`: Inner product (angle brackets).
- `\|...\|_2`: L2 norm, `\|...\|_F`: Frobenius norm.
- `\|...\|_{L^p}`: Lp norm for function spaces.

---

## Q118. Topology notation

**Code Idea:**

```latex
$\tau, \quad \mathcal{T}, \quad \overline{A}, \quad A^\circ, \quad \partial A, \quad X \cong Y$
```

**Explanation:**
- `\tau`, `\mathcal{T}`: Topologies.
- `\overline{A}`: Closure of A.
- `A^\circ`: Interior of A (may need `\overset{\circ}{A}`).
- `\partial A`: Boundary of A.
- `\cong`: Homeomorphic.

---

## Q119. Algebraic structures

**Code Idea:**

```latex
$(G, \cdot), \quad (R, +, \cdot), \quad \mathbb{Z}/n\mathbb{Z}, \quad \operatorname{Gal}(L/K)$
```

**Explanation:**
- `(G, \cdot)`: Group with operation.
- `\mathbb{Z}/n\mathbb{Z}`: Integers modulo n.
- `\operatorname{Gal}`: Galois group.

---

## Q120. Custom commands and macros

**Task:**
Create reusable MathJax macros.

**Hint:**
Use `\newcommand` in configuration

**Code Idea:**

```latex
% In MathJax configuration:
MathJax.Hub.Config({
  TeX: {
    Macros: {
      RR: "\\mathbb{R}",
      NN: "\\mathbb{N}",
      eps: "\\varepsilon",
      vec: ["\\mathbf{#1}", 1]
    }
  }
});

% Then in math:
$\RR, \quad \NN, \quad \eps, \quad \vec{x}$
```

**Explanation:**
- `\newcommand` or MathJax `Macros`: Define custom shortcuts.
- `\\mathbb{R}`: Real numbers shortcut `\RR`.
- `["\\mathbf{#1}", 1]`: Macro with one argument.
- Essential for consistent, maintainable mathematical documents.

---

# ✔ MATHJAX MASTERY SERIES COMPLETE (Q1–Q120)

---

## 📚 Quick Reference: What You've Learned

| Section | Topics |
|---------|--------|
| **Q1–Q20** | Inline/display math, Greek letters, superscripts, subscripts, fractions, roots, parentheses, basic operators |
| **Q21–Q40** | Sums, products, integrals, limits, special functions, set theory, logic, quantifiers, dots, spacing, text-in-math |
| **Q41–Q60** | Matrices (all bracket types), arrays, alignment, cases, equation numbering, under/over braces, continued fractions |
| **Q61–Q80** | Font families (mathbb, mathbf, mathcal, mathfrak, mathscr), colors, boxes, sizing, phantom spacing, tensor notation, physics/chemistry |
| **Q81–Q100** | Arrows, mappings, relations, binary operators, floor/ceiling, binomials, modulo, stackrel, overset, subarray, tagging, framing |
| **Q101–Q110** | Probability, statistics, estimators, information theory, game theory, category theory, type theory, algorithms, number theory |
| **Q111–Q120** | Geometry, calculus, differential forms, series, Fourier transforms, linear algebra, topology, algebraic structures, custom macros |

---

## 🎯 Pro Tips for MathJax Mastery

1. **Right-click any equation**: Select "Show Math As > TeX Commands" to see the source code behind any MathJax equation on the web.

2. **Use Detexify**: Draw a symbol at [detexify.kirelabs.org](https://detexify.kirelabs.org) to find its LaTeX command.

3. **Group carefully**: Always use `{...}` when applying `^` or `_` to more than one character.

4. **Size matters**: Use `\left` and `\right` for auto-sized delimiters, but switch to manual `\bigl...\bigr` when automatic sizing looks wrong.

5. **Space intentionally**: MathJax ignores literal spaces—use `\,`, `\;`, `\quad`, `\qquad` for readable spacing.

6. **Roman vs Italic**: Use `\mathrm`, `\operatorname`, `\text` for words and function names to avoid italicized variables.

7. **Platform differences**: MathJax support varies by site (Stack Exchange, GitHub, Jupyter, etc.). Test your syntax on the target platform.

---

*Master these 120 MathJax concepts and you can typeset virtually any mathematical notation for the web!*