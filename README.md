**Currency Exchange App**

This repository contains a React-based Currency Exchange application with several key features and technologies:

### Features:

1. **API Request Handling:**
   - Imitates a server error on every 5th API request, storing the request count in local storage.
   - Resets the request count in local storage after encountering an error.
   - Hides the table and displays an error message on API request error.

2. **Data Fetching with SWR:**
   - Utilizes SWR (Stale-While-Revalidate) for efficient data fetching.

3. **Editable Buy/Sell Cells:**
   - Cells become editable on hover, revealing an edit icon.
   - Clicking the edit icon displays an editable input with save/cancel icons.
   - Input value validations enforce a range of ±10% of the initial currency value from the API.
   - Save icon is disabled if the input value is outside the valid range.

4. **Currency Converter:**
   - Implements a currency converter with two input fields and a dropdown for currencies (UAH, CZK).
   - Allows swapping input values with a convenient arrow button.
   - Uses the actual currency value from the table for calculations.

5. **Page Reloading:**
   - Wipes out editable data on page reloading.
   - Fetches fresh currency rates from the API.

6. **Unit Tests:**
   - Includes unit tests for the currency converter and input value validation function.

### Technology Stack:

- **React:** A modern JavaScript library for building user interfaces.
- **Zustand:** A state management library for React applications.
- **SWR:** Stale-While-Revalidate library for efficient data fetching.
- **Unit Tests:** Jest, Karma, Mocha, React Testing Library.
- **UI Framework:** (Feel free to choose any based on preference).

### Nice-to-Have Features:

- **Fancy UI:**
  - Utilizes a UI framework for a visually appealing and responsive design.

- **Error Handling:**
  - Simulates and handles server errors.
  - Ensures min/max values in editable inputs.

- **Good-Structured Code:**
  - Follows React best practices.
  - Utilizes React hooks for state and lifecycle management.

- **Responsive Layout:**
  - Adapts to different screen sizes with a responsive design.

- **Typescript:**
  - Implements Typescript for improved code quality and development experience.

### How to Run:

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Run the app with `npm start`.

Feel free to explore the codebase, contribute, and enjoy the Currency Exchange App!
