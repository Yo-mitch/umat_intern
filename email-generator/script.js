// This script initially handlethe input validation for the programme code and reference number fields but just reference number now

//the script uses domcontentloaded because i want the js script to run after html and css is done loading
// DOMContentLoaded just says when the js script should run
document.addEventListener("DOMContentLoaded", () => {
    // storing the reference number in a variable called onReferenceNumberInput
    const onReferenceNumberInput = document.getElementById("reference-number");
    
    // const programmeError = document.getElementById("programme-code");
    const referenceNumberError = document.getElementById("reference-number");

    // logic for checking the validity of the reference number to be typed
    //add eventlistener input to listen to input/type event 
    onReferenceNumberInput.addEventListener("input", () => {
        //catch the value of the input and store it in value
        const value = onReferenceNumberInput.value;
        // validating only digits
        // if the value is not equal to the regular expression (regex)
        if (!/^\d{0,10}$/.test(value)) {
            // populate a reference number error
            alert("Reference number must be digits only and not more than 10 characters.");
            //also slice the rest of the input, don't show if the 10 digits is up
            onReferenceNumberInput.value = value.replace(/\D/g, '').slice(0, 10);
            // if the value is equal to the expression
        }else {
            //set the error content to nothing, don't show any error.
            referenceError.textContent = "";
        }
    });
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
        "BSc Solar Photovoltaic and Solar Thermal Systems",
        "BSc Land Administration and Information System",
        "BSc Spatial Planning",
        "BSc Bioenergy",
        "Game Development"
    ];

    const select = document.getElementById("programme-code");

    programmes.forEach(programme => {
        const option = document.createElement("option");
        // option.value = programme.toLowerCase().replace(/\s+/g, '-'); // optional
        option.textContent = programme;
        select.appendChild(option);
    });
});



    // programmeInput.addEventListener("input", () => {
    //     const value = programmeInput.value;
    //     if (!/^[A-Za-z]{0,2}$/.test(value)) {
    //         programmeError.textContent = "Only letters allowed (max 2 characters)";
    //         programmeInput.value = value.slice(0, -1);
    //     } else {
    //         programmeError.textContent = "";
    //     }
    // });