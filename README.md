# 💕 My Valentine Page

A personalized Valentine page with anonymous love messages - Create your page, share the link, and receive anonymous messages from friends, crushes, or secret admirers!

![Valentine App](https://via.placeholder.com/800x400/ff6b6b/ffffff?text=My+Valentine+Page)

## ✨ Features

- 🎨 **5 Beautiful Themes**: Romantic Red, Soft Pink, Purple Dreams, Golden Elegance, Pastel Dream
- 🔗 **Unique Shareable Links**: Easy to share on WhatsApp, Instagram, or anywhere
- 💌 **Anonymous Messaging**: Send love messages without revealing your identity
- 📬 **Private Inbox**: View and manage your messages securely
- 🔒 **No Login Required**: Simple and quick to use
- 📱 **Mobile Responsive**: Looks great on all devices
- 🚀 **Fast & Lightweight**: Built with Next.js 14

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- A [Supabase](https://supabase.com) account (free tier works great!)

### Installation

1. **Clone and install dependencies:**

```bash
cd valentine-app
npm install
```

2. **Set up Supabase:**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to the SQL Editor in your Supabase dashboard
   - Copy and paste the contents of `supabase/schema.sql`
   - Run the SQL to create the database tables

3. **Configure environment variables:**

```bash
cp .env.local
```

Edit `.env.local` and add your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```


4. **Run the development server:**

```bash
npm run dev
```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How It Works

### For Page Owners:

1. Visit the homepage and fill in your name and Valentine message
2. Choose a beautiful theme
3. Click "Create My Valentine Page"
4. Copy your unique share link
5. Share it with friends, crush, or on social media
6. Check your private admin inbox for anonymous messages!

### For Message Senders:

1. Open the shared Valentine page link
2. Read the personalized Valentine message
3. Write your own anonymous message (max 150 characters)
4. Click "Send Anonymously" - your identity stays hidden!

## 📁 Project Structure

```
valentine-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage (create page)
│   │   ├── globals.css         # Global styles
│   │   ├── p/[pageId]/         # Public Valentine page
│   │   │   └── page.tsx
│   │   └── admin/[pageId]/     # Private admin inbox
│   │       └── page.tsx
│   ├── components/
│   │   ├── Navbar.tsx          # Navigation
│   │   ├── Footer.tsx          # Footer
│   │   ├── PageForm.tsx        # Create page form
│   │   ├── MessageForm.tsx      # Send message form
│   │   ├── MessageCard.tsx      # Message display card
│   │   └── ThemeSelector.tsx    # Theme selection
│   ├── lib/
│   │   ├── supabase.ts         # Supabase client & helpers
│   │   └── profanity.ts        #│   └── types/
│       └── Profanity filter
 index.ts            # TypeScript types
├── supabase/
│   └── schema.sql              # Database schema
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## 🎨 Themes

| Theme              | Description                                 |
| ------------------ | ------------------------------------------- |
| 🌹 Romantic Red    | Classic Valentine vibes with reds and pinks |
| 🌸 Soft Pink       | Gentle and sweet pink tones                 |
| 💜 Purple Dreams   | Mystical purple and violet                  |
| ✨ Golden Elegance | Luxurious gold and amber                    |
| 🌙 Pastel Dream    | Calm and dreamy blues                       |

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (React), TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Supabase (PostgreSQL)
- **Deployment**: Vercel (recommended)

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Vercel:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🔒 Privacy & Safety

- **No Login Required**: Users don't need to create accounts
- **Anonymous by Default**: Message senders' identities are never stored
- **Profanity Filter**: Basic filtering is applied to messages
- **Data Retention**: Messages can be deleted by page owners
- **No Data Selling**: Your data stays yours

## 🚧 Limitations

- Messages are not encrypted (but identities remain anonymous)
- No user accounts or authentication
- Simple profanity filter (can be bypassed)
- Messages may be deleted by page owners

## 🎪 Future Enhancements

- [ ] Email notifications for new messages
- [ ] Lock messages until Valentine's Day
- [ ] Emoji picker for messages
- [ ] Photo/attachment support
- [ ] Message analytics
- [ ] Multiple languages

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 💖 Made with Love

Built with ❤️ for Valentine's Week 2026

---

**Happy Valentine's Day! 💕**
