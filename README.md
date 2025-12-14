# Crypto Checkout - Recipient Details Form

A modern, responsive crypto checkout interface built with Next.js, TypeScript, and Tailwind CSS. .

## Live Demo

- **Live Site**: [\[https://crypto-checkout-one.vercel.app/\]](https://crypto-checkout-one.vercel.app/)
- **Repository**: [\[https://github.com/Omotayo21/crypto-checkout\]](https://github.com/Omotayo21/crypto-checkout)

The implementation includes two main screens:

1. **Bank Details** - Bank selection, account number input, and account name verification
2. **Contact Details** - Recipient email and phone number with country code selector

##  Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Validation**: Custom form validation

##  Installation & Setup

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Steps

1. **Clone the repository**

   ```bash
   git clone [https://github.com/Omotayo21/crypto-checkout]
   cd crypto-checkout
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   Navigate to http://localhost:3000
   ```

##  Project Structure

```
crypto-checkout/
├── app/
│   ├── page.tsx                 # Main page component
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/
│   └── BankDetails.tsx     # bank details component
|   └── ContactDetails.tsx     # contact form component
│   └── CustomSelect.tsx     # Select component
│   └── RecipientDetailsForm.tsx     # Main form component
├── public/                      # Static assets
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies
```

## Features

### Step 1: Bank Details

-  Custom dropdown for bank selection
-  Account number input (10-digit validation)
-  Auto-populated account name after entering valid account number
-  Read-only account name display
-  Real-time validation with error messages

### Step 2: Contact Details

-  Email input with format validation
-  Phone number input with country code selector
-  Nigerian flag emoji with +234 code
-  Dropdown for multiple country codes
-  Real-time validation

### General Features

-  Fully responsive (mobile, tablet, desktop)
-  Smooth step-by-step navigation
-  Back button to return to previous step
-  Clean, modern UI matching Figma design
-  Accessibility features (ARIA labels, keyboard navigation)
-  TypeScript for type safety
-  Form state management
-  Loading simulation for account name lookup

##  Design Implementation

The design closely follows the provided Figma mockups with:

- Rounded pill-shaped input fields
- Teal/dark green primary color (#013941)
- Clean white background with subtle shadows
- Proper spacing and typography
- Responsive layout that adapts to all screen sizes

## Testing the Form

### Test Data

**Valid Account Number**: Enter any 10-digit number (e.g., `1234567890`)

- The account name "ODUTUGA GBEKE" will auto-populate after 0.5s

### Validation Rules

- Bank must be selected
- Account number must be exactly 10 digits
- Account name must be populated (happens automatically with valid account number)
- Email must be in valid format (example@domain.com)
- Phone number must be at least 10 digits

## Assumptions & Trade-offs

### Assumptions Made:

1. **Account Name Lookup**: Simulated with a 500ms delay and mock data. In production, this would call a real banking API.
2. **Bank List**: Used a static list of popular Nigerian banks. In production, this would be fetched from an API.
3. **Country Codes**: Limited to 4 countries for demo purposes. Production would include all countries.
4. **Form Submission**: Currently logs to console and shows alert. Would integrate with backend API in production.

### Trade-offs:

1. **State Management**: Used React's built-in `useState` instead of Redux/Zustand for simplicity, as the form state is self-contained.
2. **Validation**: Implemented custom validation instead of using other major libraries.

3. **Mobile Optimization**: Prioritized clean design over complex mobile interactions (like native-style bottom sheets for dropdowns).

##  Future Enhancements

If given more time, I would add:

- [ ] Integration with real banking APIs
- [ ] More comprehensive form validation library
- [ ] Animation library (Framer Motion) for smoother transitions
- [ ] Progress indicator showing step 1 of 2
- [ ] Local storage to persist form data
- [ ] Additional form fields based on requirements
- [ ] Dark mode support

For any questions or clarifications, please reach out:

- **Email**: [rufaiabdulrahman21@gmail.com.com]
