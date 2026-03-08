# 📐 Analytics Dashboard - Component Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    React Application                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                     App.jsx                              │  │
│  │  Routes:                                                 │  │
│  │  ├─ / (Home)                                             │  │
│  │  ├─ /editor (Code Editor)                                │  │
│  │  ├─ /dashboard (Analysis History)                        │  │
│  │  └─ /analytics (SaaS Dashboard) ← NEW                    │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                  Analytics Page Route                           │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                 Analytics.jsx (Wrapper)                  │  │
│  │            Imports: Dashboard component                  │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Dashboard.jsx (Main)                         │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │        Sidebar.jsx (Left Navigation)                    │  │
│  │  ┌────────────────────────────────────────┐             │  │
│  │  │ Logo & Branding                        │             │  │
│  │  ├────────────────────────────────────────┤             │  │
│  │  │ Menu Items (Home, Projects, etc)       │             │  │
│  │  ├────────────────────────────────────────┤             │  │
│  │  │ Submenu (View All, Recent, Settings)   │             │  │
│  │  ├────────────────────────────────────────┤             │  │
│  │  │ Upgrade Card                           │             │  │
│  │  └────────────────────────────────────────┘             │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │        Topbar.jsx (Header & Controls)                   │  │
│  │  ┌──────────────┬──────────────┬──────────────┐         │  │
│  │  │ Page Title   │ Date Range   │ Team Filter  │         │  │
│  │  └──────────────┴──────────────┴──────────────┘         │  │
│  │  ┌──────────┬──────────┬──────────┬──────────┐          │  │
│  │  │ Search   │ Notif    │ Share ▼  │ Profile  │          │  │
│  │  └──────────┴──────────┴──────────┴──────────┘          │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │           Main Content Area (Scrollable)                │  │
│  │                                                         │  │
│  │  [Title] "Welcome back, Developer! 👋"                 │  │
│  │                                                         │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │        DashboardCard Components (4 cols)        │  │  │
│  │  │  ┌────────────┐ ┌────────────┐                 │  │  │
│  │  │  │ Total PRs  │ │ Bugs Found │                 │  │  │
│  │  │  │ 1,234      │ │ 127        │                 │  │  │
│  │  │  │ ↑ 12%      │ │ ↑ 8%       │                 │  │  │
│  │  │  └────────────┘ └────────────┘ ...             │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │                                                         │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │     MetricsChart Components (2 cols grid)       │  │  │
│  │  │  ┌──────────────────┐  ┌──────────────────┐   │  │  │
│  │  │  │ Reviewed PRs     │  │ Total Reviews    │   │  │  │
│  │  │  │                  │  │                  │   │  │  │
│  │  │  │ [Line Chart]     │  │ [Line Chart]     │   │  │  │
│  │  │  │                  │  │                  │   │  │  │
│  │  │  └──────────────────┘  └──────────────────┘   │  │  │
│  │  │                                                │  │  │
│  │  │  ┌──────────────────┐  ┌──────────────────┐   │  │  │
│  │  │  │ Lines Accepted   │  │ Quality Trend    │   │  │  │
│  │  │  │                  │  │                  │   │  │  │
│  │  │  │ [Line Chart]     │  │ [Line Chart]     │   │  │  │
│  │  │  │                  │  │                  │   │  │  │
│  │  │  └──────────────────┘  └──────────────────┘   │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │                                                         │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │      Recent Activity Section                    │  │  │
│  │  │  ┌────────────────────────────────────────────┐ │  │  │
│  │  │  │ PR #1251 reviewed | 67 lines | Quality: 92% │ │  │  │
│  │  │  │ PR #1252 reviewed | 45 lines | Quality: 88% │ │  │  │
│  │  │  │ ... (More items)                           │ │  │  │
│  │  │  └────────────────────────────────────────────┘ │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │                                                         │  │
│  │  [Last updated: March 5, 2026, 12:06 PM]             │  │
│  │                                                         │  │
│  └─────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
Dashboard
│
├── Sidebar
│   ├── Logo Section
│   │   ├── Icon Badge
│   │   ├── Brand Name
│   │   └── Tagline
│   │
│   ├── Navigation Menu
│   │   ├── Home (No submenu)
│   │   ├── Projects (Expandable)
│   │   │   ├── View All
│   │   │   ├── Recent
│   │   │   └── Settings
│   │   ├── Metrics (Expandable)
│   │   ├── Resources (Expandable)
│   │   ├── Teams (Expandable)
│   │   └── Automation (Expandable)
│   │
│   └── Upgrade Section
│       ├── Heading
│       ├── Description
│       └── CTA Button
│
├── Main Content Area (md:ml-64)
│   │
│   ├── Topbar
│   │   ├── Left Section
│   │   │   ├── Page Title
│   │   │   ├── Date Range Selector
│   │   │   └── Team Filter
│   │   │
│   │   └── Right Section
│   │       ├── Search Bar
│   │       ├── Notifications Dropdown
│   │       │   └── Notification Items
│   │       ├── Share Menu Dropdown
│   │       │   ├── Copy Link Option
│   │       │   ├── Export CSV Option
│   │       │   └── Export PNG Option
│   │       ├── User Avatar
│   │       └── Settings Button
│   │
│   └── Content Area (Scrollable)
│       │
│       ├── Welcome Header
│       │   ├── Greeting Message
│       │   └── Description
│       │
│       ├── DashboardCard Grid (4 columns)
│       │   ├── DashboardCard 1 (Total PRs)
│       │   ├── DashboardCard 2 (Bugs Found)
│       │   ├── DashboardCard 3 (Security Issues)
│       │   └── DashboardCard 4 (Quality Score)
│       │
│       ├── MetricsChart Grid (2 columns)
│       │   ├── Row 1
│       │   │   ├── MetricsChart (Reviewed PRs)
│       │   │   └── MetricsChart (Total Reviews)
│       │   ├── Row 2
│       │   │   ├── MetricsChart (Lines Accepted)
│       │   │   └── MetricsChart (Quality Trend)
│       │   ├── Row 3
│       │   │   ├── MetricsChart (Bugs Detected)
│       │   │   └── MetricsChart (Security Issues)
│       │
│       ├── Recent Activity Section
│       │   ├── Section Title
│       │   └── Activity Items (List)
│       │       ├── Icon Badge
│       │       ├── Title & Description
│       │       ├── Quality Badge
│       │       └── Timestamp
│       │
│       └── Footer
│           └── Last Updated Timestamp
```

## Data Flow

```
User Interactions
        ↓
┌──────────────────────────────────────┐
│  Sidebar.jsx                         │
│  - Click menu items                  │  
│  - Toggle submenus                   │
│  - Click upgrade button              │
└──────────────────────────────────────┘
        ↓
┌──────────────────────────────────────┐
│  Topbar.jsx                          │
│  - Select date range                 │
│  - Choose team filter                │
│  - Search functionality              │
│  - Notifications dropdown            │
│  - Share options                     │
│  - User profile                      │
└──────────────────────────────────────┘
        ↓
┌──────────────────────────────────────┐
│  Dashboard.jsx                       │
│  - Manages state                     │
│  - Stores mock/real data             │
│  - Renders all components            │
│  - Responsive layout                 │
└──────────────────────────────────────┘
        ↓
┌──────────────────────────────────────┐
│  DashboardCard & MetricsChart        │
│  - Display metrics                   │
│  - Show trends                       │
│  - Render charts                     │
│  - Export data                       │
└──────────────────────────────────────┘
```

## File Structure

```
src/
├── dashboard/                          # New dashboard components
│   ├── Sidebar.jsx                     # Navigation component
│   ├── Topbar.jsx                      # Header component
│   ├── DashboardCard.jsx               # Metric card component
│   ├── MetricsChart.jsx                # Chart component
│   └── Dashboard.jsx                   # Main container
│
├── pages/
│   ├── Home.jsx                        # Home page
│   ├── Editor.jsx                      # Code editor page
│   ├── Dashboard.jsx                   # Old dashboard (analysis history)
│   └── Analytics.jsx                   # New analytics page (wrapper)
│
├── components/
│   ├── Navbar.jsx                      # Top navbar (updated with Analytics link)
│   ├── CodeEditor.jsx
│   ├── ResultPanel.jsx
│   ├── IssuesList.jsx
│   ├── QualityScoreDisplay.jsx
│   └── Suggestions.jsx
│
├── App.jsx                             # Main app (updated with /analytics route)
├── App.css
├── index.css
└── main.jsx
```

## State Management

### Dashboard.jsx State

```javascript
const [sidebarOpen, setSidebarOpen] = useState(false);
// ↑ Controls mobile sidebar visibility
```

### Sidebar.jsx State

```javascript
const [expandedMenu, setExpandedMenu] = useState(null);
// ↑ Tracks which menu is expanded
```

### Topbar.jsx State

```javascript
const [dateRange, setDateRange] = useState('7days');
const [filterTeam, setFilterTeam] = useState('All Teams');
const [shareMenuOpen, setShareMenuOpen] = useState(false);
const [notificationOpen, setNotificationOpen] = useState(false);
// ↑ Track filter, menu, and dropdown states
```

## Responsive Grid Layouts

### DashboardCard Grid

```css
/* Desktop (lg and above) */
grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
/* Result: 1 col mobile, 2 col tablet, 4 col desktop */

/* Tablet (md-lg) */
grid-cols-2
/* Result: 2 column grid */

/* Mobile (below sm) */
grid-cols-1
/* Result: 1 column full width */
```

### MetricsChart Grid

```css
/* Large screens */
grid-cols-1 lg:grid-cols-2
/* Result: 1 col mobile/tablet, 2 col desktop */

/* Creates 3 rows of 2 charts each:
   Row 1: Reviewed PRs | Total Reviews
   Row 2: Lines Accepted | Quality Trend
   Row 3: Bugs Detected | Security Issues */
```

## Color Mapping

### DashboardCard Colors

```javascript
{
  blue:   { bg: 'bg-blue-50', icon: 'text-blue-600' },
  green:  { bg: 'bg-green-50', icon: 'text-green-600' },
  purple: { bg: 'bg-purple-50', icon: 'text-purple-600' },
  orange: { bg: 'bg-orange-50', icon: 'text-orange-600' },
  red:    { bg: 'bg-red-50', icon: 'text-red-600' }
}
```

### MetricsChart Colors

```javascript
{
  blue:   { border: 'rgb(59, 130, 246)', bg: 'rgba(59, 130, 246, 0.1)' },
  green:  { border: 'rgb(34, 197, 94)', bg: 'rgba(34, 197, 94, 0.1)' },
  purple: { border: 'rgb(168, 85, 247)', bg: 'rgba(168, 85, 247, 0.1)' },
  orange: { border: 'rgb(249, 115, 22)', bg: 'rgba(249, 115, 22, 0.1)' },
  red:    { border: 'rgb(239, 68, 68)', bg: 'rgba(239, 68, 68, 0.1)' }
}
```

## Props Flow

```
Dashboard.jsx
├─ Sidebar
│  ├─ isOpen (boolean)
│  └─ setIsOpen (function)
│
├─ Topbar
│  └─ No props (internal state)
│
├─ DashboardCard (4 instances)
│  ├─ title
│  ├─ value
│  ├─ trend
│  ├─ icon
│  ├─ color
│  └─ action
│
└─ MetricsChart (6 instances)
   ├─ title
   ├─ value
   ├─ trend
   ├─ data { labels, values }
   └─ color
```

---

**Dashboard v1.0** | Production Ready ✅
