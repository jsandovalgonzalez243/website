/**
 * Professor's Note: JAVASCRIPT ANIMATION LOGIC TUTORIAL
 * * This file contains the JavaScript (JS) logic that controls page content
 * and demonstrates fundamental programming concepts like Arrays and If Statements.
 * * The HTML and CSS handle the visual animations (like the navbar hover),
 * but JS handles the behavior (what happens when a button is clicked).
 */

// We use 'DOMContentLoaded' to ensure the entire HTML structure is loaded
// before we try to select any elements with JavaScript. This prevents errors.
/** 
 * Event is a browser event that fires when the initial HTML document has been 
 * completely loaded and parsed, meaning the Document Object Model (DOM) 
 * is fully constructed. 
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SETUP & ELEMENT SELECTION ---

    // Define variables to hold references to our HTML elements.
    // We use const because these references won't change. Defines a constant reference to a value.
    const titleElement = document.getElementById('main-title');
    const subtitleElement = document.getElementById('subtitle-text');
    const statusMessageElement = document.getElementById('status-message');
    const changeTextBtn = document.getElementById('change-text-btn');
    const statusBtn = document.getElementById('status-btn');
    
    // An array to hold the navigation link elements.
    const navLinks = [
        document.getElementById('nav-link-0'),
        document.getElementById('nav-link-1'),
        document.getElementById('nav-link-2')
    ];


    // --- 2. CORE CONCEPT: ARRAYS ---

    // An array is a list of values. It's great for storing related data
    // like messages, colors, coordinates, or, in this case, navigation labels.
    const navTitlesArray = [
        "Home Page",
        "Coding Demos",
        "Student Info",
        "Final Project", // We have four items in this array (indices 0, 1, 2, 3)
        "Home Pg",
        "Code Demos",
        "Info",
        "First Project"
    ];

    // keeping track of which navigation title to display.
    let currentTitlesIndex = 0;

    // An array to hold different status messages we can display.
    const statusMessagesArray = [
        "Status: Ready to Code!",
        "Status: Animation Loop Started.",
        "Status: Arrays are fun!",
        "Status: Conditional logic applied."
    ];

    // This variable will track which message we are currently showing.
    let currentMessageIndex = 0;


    // --- 3. EVENT LISTENERS (Handling Clicks) ---

    // When the 'Change Text' button is clicked, run the function 'updateNavText'.
    changeTextBtn.addEventListener('click', updateNavText);

    // When the 'Check Status' button is clicked, run the function 'checkStatus'.
    statusBtn.addEventListener('click', checkStatus);


    // --- 4. FUNCTION DEFINITIONS ---

    /**
     * TUTORIAL: ARRAY USAGE
     * This function cycles through our 'navTitlesArray' and updates the text 
     * in the navigation bar's links.
     */
    // Modified to keep structure but is able to loop.
    function updateNavText() {
        // Use a loop to iterate over the nav link elements (navLinks array).
        // The loop runs three times: once for nav-link-0, nav-link-1, and nav-link-2.
        for (let i = 0; i < navLinks.length; i++) {
            // Check if the array contains the required title before assigning (safety check)
            if (navTitlesArray[i]) {
                // Set the text content of the HTML link element to the value in the array.
                // We are mapping navLinks[0] to navTitlesArray[0], [1] to [1], etc.
                // Modified to keep index inside array.
                navLinks[i].textContent = navTitlesArray[i + currentTitlesIndex * 4 % navTitlesArray.length];
            }
        }
        // As a bonus, change the main subtitle to indicate the change.
        // Modified to add number of Index which loops back to 1.
        subtitleElement.textContent = "Navigation links successfully updated by JavaScript! (" + (currentTitlesIndex % 2 + 1) + ")";
        // Add one to index.
        currentTitlesIndex += 1;
        subtitleElement.style.color = '#34D399'; // Green accent
    }

    /**
     * TUTORIAL: CONDITIONAL (IF/ELSE) STATEMENTS
     * This function changes the status message and applies different visual styles
     * based on the value of a single variable (currentMessageIndex).
     */
    function checkStatus() {
        
        // 1. Update the index for the next message.
        // The modulo (%) operator ensures the index wraps back to 0 when it hits the end of the array.
        // Example: If index is 3, (3 + 1) % 4 = 0. It resets!
        currentMessageIndex = (currentMessageIndex + 1) % statusMessagesArray.length;

        // Get the current message from the array.
        const currentMessage = statusMessagesArray[currentMessageIndex];

        // 2. Display the new message.
        statusMessageElement.textContent = currentMessage;


        // 3. Conditional Logic (IF/ELSE IF/ELSE)
        // We use an IF statement to perform different actions based on a condition.

        if (currentMessageIndex === 0) {
            // Condition 1: If the index is 0, set the color to Gold.
            statusMessageElement.style.color = '#FFC107';
            statusMessageElement.style.textShadow = 'none';

        } else if (currentMessageIndex === 1) {
            // Condition 2: If the index is 1, set the color to Purple and add a shadow.
            statusMessageElement.style.color = '#818CF8';
            statusMessageElement.style.textShadow = '0 0 10px #818CF8';

        } else {
            // Condition 3 (Else): If the index is anything else (2 or 3 in our case), 
            // set the color to Pink and reset the shadow.
            statusMessageElement.style.color = '#F472B6';
            statusMessageElement.style.textShadow = 'none';
        }
    }
});