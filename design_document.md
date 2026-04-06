# System Design Document: MiniUpwork

**Project Name:** MiniUpwork  
**Type:** Full-Stack Web Application (Freelance Marketplace)

---

## 1. Executive Summary

MiniUpwork is a specialized two-sided marketplace connecting clients with freelance talent. Clients can post projects, review incoming proposals, and award contracts. Freelancers can browse open projects, submit tailored bids, and track their proposal status. The application employs a modern, professional web interface paired with a robust Java-based backend architecture.

## 2. Technology Stack

### Frontend (Client-side)
- **Framework:** React 19 built with Vite.
- **Styling:** Tailwind CSS (v3.4) configured with a custom design system focusing on professional SaaS aesthetics.
- **Typography & Icons:** Inter font from Google Fonts, and Lucide-React for crisp, scalable iconography.
- **Routing & Networking:** `react-router-dom` for navigation, Axios for API data fetching and JWT interceptors.

### Backend (Server-side)
- **Framework:** Spring Boot (v4.x series) built with Maven.
- **Language:** Java 17.
- **Security:** Spring Security heavily utilizing JWT (JSON Web Tokens) for stateless authentication.
- **Data Access:** Spring Data JPA / Hibernate layered over JDBC.
- **Utilities:** Lombok to reduce boilerplate code for DTOs and Entities.

### Database
- **Engine:** H2 In-Memory Database (configured via `application.properties` for rapid development and testing cycles).
- **DDL Management:** Hibernate `ddl-auto=update`

---

## 3. Architecture & Data Model

### 3.1 Core Entities

1. **User (`User.java`)**: The primary authentication entity. Users exist as either `ROLE_CLIENT` or `ROLE_FREELANCER`.
2. **Job (`Job.java`)**: Represents a project posted by a client. Features fields like Title, Description, Budget, and `JobStatus` (e.g., OPEN, IN_PROGRESS, COMPLETED).
3. **Bid (`Bid.java`)**: A proposal submitted by a freelancer on a specific Job. Contains the Bid Amount, Cover Letter / Proposal text, and `BidStatus` (PENDING, ACCEPTED, REJECTED).
4. **Contract & Review**: Supporting entities for handling the lifecycle of an accepted Bid and post-job feedback.

### 3.2 Backend Controllers & APIs

- **`AuthController`**: Handles `/api/auth/register` and `/api/auth/login`. Returns JWT tokens upon successful authentication.
- **`JobController`**: Handles `/api/jobs` operations including posting jobs (clients only), fetching open jobs (`/open`), and fetching user-specific jobs (`/myjobs`).
- **`BidController`**: Handles `/api/bids` operations including submitting bids (freelancers only), viewing bids on a specific job (`/job/{id}`), and accepting offers (`/{bidId}/accept`).

---

## 4. UI/UX Design System

The platform recently underwent a comprehensive design review to pivot from an experimental "agentic" look to a standard **Professional Corporate** UI, heavily inspired by top-tier SaaS platforms.

- **Color Palette:** 
  - **Primary Base:** Light neutrals (`bg-gray-50`) to minimize eye strain.
  - **Brand Accent:** Professional Emerald/Green (`bg-green-600`) utilized for primary actions, success states, and branding, ensuring a high-trust institutional feel.
- **Typography:** The **Inter** font family is exclusively used for high legibility across data-dense views.
- **Component Style (`.ui-card`):** All containers follow a clean structural hierarchy utilizing flat white backgrounds (`bg-white`), subtle 1px gray borders (`border-gray-200`), and minimal drop shadows. 

---

## 5. Security & Authentication Flow

1. **Registration:** Users securely submit constraints. Passwords are encrypted before persisting to the DB.
2. **Login & JWT:** Upon valid credentials, the server signs and returns a JWT (expiring in 24 hours).
3. **Session Management:** The React frontend stores this token (typically in `localStorage` or context) and attaches it as a `Bearer` token to the Authorization header of all subsequent Axios requests.
4. **Endpoint Authorization:** The Spring server verifies the JWT signature on incoming requests. Role-based access control (RBAC) ensures freelancers cannot post jobs and clients cannot submit bids.

---

## 6. Future Considerations & Roadmap

- **Database Migration:** Transition from the H2 in-memory database to a persistent RDBMS like PostgreSQL or MySQL for production deployment.
- **Real-time Communication:** Implement WebSockets (e.g., using Spring WebSocket or STOMP) to allow real-time chat between clients and freelancers upon contract acceptance.
- **Payment Gateway Integration:** Incorporate Stripe or Razorpay APIs to handle escrow modules, milestones, and fund releases securely.
