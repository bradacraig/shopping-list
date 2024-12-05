# Shopping List App

I was sick of using a pen and paper for my grocery shopping list so decided to build a simple, responsive shopping list app that allows users to add, organize, and manage their grocery items efficiently. It's optimised for use on mobile and re-orders the list based on which department the item belongs to. It is deployed and currently in use as a personal app reading and writing from one list on the database and as a result is not configured for multiple users yet.

---

## Features

- **Add Items to the List**: Users can input items and assign them to specific grocery store departments.
- **Organized by Departments**: Items are automatically grouped and ordered by department (regardless of when they were added) for easier navigation.
- **Mark Items as Purchased**: Check off items as you shop while keeping them visible in the list for reference.
- **Delete Individual Items or Entire List**: Remove items one by one or clear the entire list with a single button.
- **Mobile-Optimized Design**: Fully responsive layout for seamless use on mobile devices.
- **Persistent Data**: All changes are saved in real-time using Firebase.

---

## Technology Stack

### Frontend

- **React**: Interactive UI components.
- **Tailwind CSS**: Responsive and modern styling.
- **Vite**: Fast development and build tooling.

### Backend

- **Firebase**: Hosting and Firestore for real-time data storage and retrieval.

<!-- --- -->

<!-- ## Installation

### Prerequisites
- Node.js (v16 or higher)
- Firebase CLI

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/shopping-list-app.git
   cd shopping-list-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Configure your Firebase project.
   - Add your Firebase configuration to `firebaseConfig.ts`.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open the app in your browser at `http://localhost:5173`. -->

---

## Usage

1. **Add Items**:

   - Enter the name of an item and select its department from the dropdown.
   - Press "Add Item" to include it in the list.

2. **Check Off Items**:

   - Use the checkbox to mark items as purchased. The text will appear with a strikethrough.

3. **Delete Items**:

   - Use the red "X" button to delete individual items.
   - Press the "Delete List" button to clear the entire list.

4. **Mobile-Friendly**:
   - Access the app on your phone for a convenient shopping experience.

---

## Future Enhancements

- **User Authentication**: Enable login to manage multiple lists for different users.
- **Price Tracking**: Add pricing details and calculate estimated total cost.

---
