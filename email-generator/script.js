
// Enhanced JavaScript for Email Generator Form
// Handles input validation, programme selection, and form submission
document.addEventListener("DOMContentLoaded", () => {
    // Form elements
    const form = document.querySelector("form");
    const onReferenceNumberInput = document.getElementById("reference-number");
    const firstnameInput = document.querySelector('input[name="firstname"]');
    const surnameInput = document.querySelector('input[name="surname"]');
    const programmeSelect = document.getElementById("programme-code");
    const btn = document.getElementById("generateBtn");
    const btnText = btn.querySelector(".btn-text");
    const loader = btn.querySelector(".loader");

    // Programme options data
    const programmes = [
        "Bsc Computer Science and Engineering (CE)",
        "Bsc Information Systems (IS)",
        "Bsc Cyber Security (CY)",
        "Bsc Mathematics (MA)",
        "BSc Electrical and Electronic Engineering (EL)",
        "BSc Environmental and Safety Engineering (ES)",
        "BSc Geological Engineering (GL)",
        "BSc Geomatic Engineering (GM)",
        "BSc Mechanical Engineering (MC)",
        "BSc Mining Engineering (MN)",
        "BSc Minerals Engineering (MR)",
        "BSc Logistics and Transport Management (LT)",
        "BSc Petroleum Engineering (PE)",
        "BSc Renewable Energy Engineering (RN)",
        "BSc Natural Gas Engineering (NG)",
        "BSc Petroleum Refining and Petrochemical Engineering (RP)",
        "BSc Petroleum Geosciences and Engineering (PG)",
        "BSc Statistical Data Science (SD)",
        "BSc Land Administration" ,
        "BSc Spatial Planning"
    ];

    // Initialize form
    initializeForm();

    // Event listeners
    attachEventListeners();

    // Initialize form components
    function initializeForm() {
        populateProgrammeDropdown();
    }

    // Attach all event listeners
    function attachEventListeners() {
        // Input validation listeners
        onReferenceNumberInput.addEventListener("input", handleReferenceNumberInput);
        firstnameInput.addEventListener("input", (e) => handleNameInput(e, "First name"));
        surnameInput.addEventListener("input", (e) => handleNameInput(e, "Surname"));
        
        // Form submission listener
        form.addEventListener("submit", handleFormSubmission);
    }

    // Populate programme dropdown
    function populateProgrammeDropdown() {
        // Add default option
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Select your programme";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        programmeSelect.appendChild(defaultOption);

        // Add all programme options
        programmes.forEach(programme => {
            const option = document.createElement("option");
            option.value = programme;
            option.textContent = programme;
            programmeSelect.appendChild(option);
        });
    }

    // Handle reference number input validation
    function handleReferenceNumberInput() {
        const value = onReferenceNumberInput.value;
        
        // Validate only digits and max 10 characters
        if (!/^\d{0,10}$/.test(value)) {
            alert("Reference number must be digits only and not more than 10 characters.");
            // Clean the input: remove non-digits and limit to 10 characters
            onReferenceNumberInput.value = value.replace(/\D/g, '').slice(0, 10);
        }
        
        // Clear any existing error styling
        clearFieldError(onReferenceNumberInput);
    }

    // Handle name input validation
    function handleNameInput(event, fieldName) {
        validateNameField(event.target, fieldName);
    }

    // Handle form submission
    function handleFormSubmission(event) {
        // Validate all fields before submission
        if (!validateCompleteForm()) {
            event.preventDefault();
            showFormError("Please fix all errors before submitting the form.");
            return;
        }

        // Show loading state
        setLoadingState(true);
        
        // Form will submit naturally to PHP after validation passes
    }

    // Validation functions
    function validateNameField(input, fieldName) {
        const value = input.value.trim();
        
        // Allow empty during typing
        if (value.length === 0) {
            clearFieldError(input);
            return true;
        }
        
        // Check for valid name characters
        if (!/^[A-Za-z\s\-']+$/.test(value)) {
            showFieldError(input, `${fieldName} can only contain letters, spaces, hyphens, and apostrophes.`);
            return false;
        }
        
        // Check length limits
        if (value.length > 50) {
            showFieldError(input, `${fieldName} cannot exceed 50 characters.`);
            return false;
        }
        
        if (value.length < 2) {
            showFieldError(input, `${fieldName} must be at least 2 characters long.`);
            return false;
        }
        
        clearFieldError(input);
        addSuccessState(input);
        return true;
    }

    function validateCompleteForm() {
        let isValid = true;
        
        // Define required fields with their validation rules
        const requiredFields = [
            { input: firstnameInput, name: "First name", minLength: 2 },
            { input: surnameInput, name: "Surname", minLength: 2 },
            { input: programmeSelect, name: "Programme", isSelect: true },
            { input: onReferenceNumberInput, name: "Reference number", minLength: 1 }
        ];
        
        // Validate required fields
        requiredFields.forEach(field => {
            if (!validateRequiredField(field)) {
                isValid = false;
            }
        });
        
        // Specific validations
        if (!validateReferenceNumberFormat()) isValid = false;
        if (!validateNameFields()) isValid = false;
        
        return isValid;
    }

    function validateRequiredField(field) {
        const value = field.input.value.trim();
        
        if (!value || (field.isSelect && value === "")) {
            showFieldError(field.input, `${field.name} is required.`);
            return false;
        }
        
        if (field.minLength && value.length < field.minLength) {
            showFieldError(field.input, `${field.name} must be at least ${field.minLength} characters long.`);
            return false;
        }
        
        return true;
    }

    function validateReferenceNumberFormat() {
        if (onReferenceNumberInput.value && !/^\d{1,10}$/.test(onReferenceNumberInput.value)) {
            showFieldError(onReferenceNumberInput, "Reference number must contain 1-10 digits only.");
            return false;
        }
        return true;
    }

    function validateNameFields() {
        let isValid = true;
        
        if (firstnameInput.value && !validateNameField(firstnameInput, "First name")) {
            isValid = false;
        }
        
        if (surnameInput.value && !validateNameField(surnameInput, "Surname")) {
            isValid = false;
        }
        
        return isValid;
    }

    // UI feedback functions
    function showFieldError(input, message) {
        clearFieldError(input);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        
        // Add error styling
        input.classList.add('error');
        input.classList.remove('success');
        input.parentNode.classList.add('has-error');
        
        // Insert error message
        input.parentNode.appendChild(errorDiv);
    }

    function clearFieldError(input) {
        // Remove existing error message
        const existingError = input.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Remove error styling
        input.classList.remove('error');
        input.parentNode.classList.remove('has-error');
    }

    function addSuccessState(input) {
        clearFieldError(input);
        input.classList.add('success');
        input.classList.remove('error');
    }

    function showFormError(message) {
        // Remove existing form errors
        const existingError = form.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.textContent = message;
        
        // Insert at the top of the form
        form.insertBefore(errorDiv, form.firstElementChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }

    function showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        
        form.insertBefore(successDiv, form.firstElementChild);
        
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
        }, 5000);
    }

    function setLoadingState(isLoading) {
        if (isLoading) {
            btn.disabled = true;
            btn.classList.add('btn-loading');
            btnText.style.display = "none";
            loader.style.display = "inline-block";
        } else {
            btn.disabled = false;
            btn.classList.remove('btn-loading');
            btnText.style.display = "inline";
            loader.style.display = "none";
        }
    }

    // Utility functions
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Optional: Add debounced validation for better performance
    const debouncedNameValidation = debounce((input, fieldName) => {
        validateNameField(input, fieldName);
    }, 300);

    // Public API (if needed for external access)
    window.EmailFormValidator = {
        validateForm: validateCompleteForm,
        setLoadingState: setLoadingState,
        showError: showFormError,
        showSuccess: showSuccessMessage
    };
});