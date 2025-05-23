// This script handles the input validation for the programme code and reference number fields
    document.addEventListener("DOMContentLoaded", () => {
    const programmeInput = document.getElementById("programme-code");
    const referenceInput = document.getElementById("reference-number");

    const programmeError = document.getElementById("programme-code");
    const referenceError = document.getElementById("reference-number");

    programmeInput.addEventListener("input", () => {
        const value = programmeInput.value;
        if (!/^[A-Za-z]{0,2}$/.test(value)) {
            programmeError.textContent = "Only letters allowed (max 2 characters)";
            programmeInput.value = value.slice(0, -1);
        } else {
            programmeError.textContent = "";
        }
    });

    referenceInput.addEventListener("input", () => {
        const value = referenceInput.value;
        if (!/^\d{0,10}$/.test(value)) {
            referenceError.textContent = "Only digits allowed (max 10)";
            referenceInput.value = value.replace(/\D/g, '').slice(0, 10);
        } else {
            referenceError.textContent = "";
        }
    });
});
