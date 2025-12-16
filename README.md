# Ephemera

> **Status: ENCRYPTED**  
> **Connection: SECURE**

Ephemera is a real-time, ephemeral chat application designed for secure, temporary communication. Built with a cyberpunk aesthetic, it offers instant room creation, anonymous identities, and message streams that don't stick around.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-cyan)

## 🚀 Features

- **Real-time Messaging**: Instant message delivery powered by Pusher.
- **Ephemeral Rooms**: Rooms are designed to be temporary.
- **Anonymous Identities**: Auto-generated "hacker" aliases for every user.
- **Cyberpunk UI**: Immersive interface with glassmorphism, terminal logs, and grid backgrounds.
- **Zero Login**: No sign-up required. Just create a room and share the link.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) 
- **Real-time Engine**: [Pusher](https://pusher.com/)
- **Database/State**: [Upstash Redis](https://upstash.com/)


### Prerequisites

- Node.js 18+ 
- A Pusher account (Channels)
- An Upstash account (Redis)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kabillanta/ephemera.git
   cd ephemera
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory and add your credentials:

   ```env
   # Pusher (Real-time)
   PUSHER_APP_ID=your_app_id
   NEXT_PUBLIC_PUSHER_KEY=your_key
   PUSHER_SECRET=your_secret
   NEXT_PUBLIC_PUSHER_CLUSTER=your_cluster

   # Upstash Redis (Storage)
   UPSTASH_REDIS_REST_URL=your_upstash_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_token
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```
ephemera/
├── app/                # Next.js App Router pages
│   ├── api/            # API Routes (Message handling, Room creation)
│   ├── create/         # Room creation logic
│   ├── room/[id]/      # Chat room interface
│   └── page.tsx        # Landing page
├── lib/                # Utility functions & Service configs
│   ├── pusher.ts       # Pusher client/server setup
│   ├── redis.ts        # Redis connection
│   └── utils.ts        # Helper functions
└── public/             # Static assets
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
