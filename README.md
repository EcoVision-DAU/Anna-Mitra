{
  "id": "58291",
  "variant": "standard",
  "title": "Password Regex Explanation"
}
# Password Regex Explanation

Your backend is validating passwords using the following regular expression:

```
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
```

This pattern enforces strong password rules. Below is a complete explanation of what each part means.

---

## ✔ Password Requirements

Your password **must satisfy all of the following conditions**:

### 1. **Minimum Length**
- Password must be **at least 8 characters long**.
- Defined by:  
  ```
  {8,}
  ```

### 2. **At Least One Lowercase Letter**
- Must contain a–z  
  Regex part:
  ```
  (?=.*[a-z])
  ```

### 3. **At Least One Uppercase Letter**
- Must contain A–Z  
  Regex part:
  ```
  (?=.*[A-Z])
  ```

### 4. **At Least One Digit**
- Must contain 0–9  
  Regex part:
  ```
  (?=.*\d)
  ```

### 5. **At Least One Special Character**
- Allowed special characters are:  
  `@  $  !  %  *  ?  &`
- Regex part:
  ```
  (?=.*[@$!%*?&])
  ```

### 6. **Only Certain Characters Are Allowed**
Allowed characters:
- Uppercase A–Z  
- Lowercase a–z  
- Digits 0–9  
- Special characters: `@  $  !  %  *  ?  &`

Regex part:
```
[A-Za-z\d@$!%*?&]
```

❌ Characters **not allowed**:
- `.` (dot)
- `_` (underscore)
- `-` (dash)
- `#` (hash)
- Any other symbol not listed above

---

## ❌ Why Your Password Failed

You tried using:

```
202412072@daiict.ac.inA
```

This fails because:
- It contains a **`.` (dot)** which is **not allowed** by the regex.

Everything else (uppercase, lowercase, digit, special char, length) is correct.

---

## ✔ Valid Examples

These passwords correctly follow the rule:

```
Abcd1234!
Daiict2024@A
MyTest@123
Password1&
```

If you want something similar to your password without the dot:

```
202412072@daiictA
```

---

## ✔ Want to Allow More Special Characters?

If you want to allow:
- `.`
- `_`
- `-`
- any other symbols

I can modify the regex for you.

Just tell me:
**Which special characters should be allowed?**

