# 📊 Analytics Dashboard Documentation

## Overview

The Analytics Dashboard is a professional SaaS-style analytics UI for the AI Code Review Platform. It provides comprehensive metrics, visualizations, and data insights into code review activities.

## Features

✅ **Modern SaaS Design**
- Clean, professional interface
- Responsive layout for all devices
- Smooth animations and hover effects
- Soft shadows and rounded cards

✅ **Interactive Components**
- Sidebar navigation with expandable menus
- Top navigation bar with filters and actions
- Chart visualizations using Chart.js
- Metric cards with trending indicators
- Notification center
- Share options (Copy link, Export CSV, Export PNG)
- User profile menu

✅ **Data Visualizations**
- Line charts for metrics tracking
- Trend indicators (↑ ↓ →)
- Progress bars on metric cards
- Color-coded sections (blue, green, purple, orange, red)
- Responsive charts that adapt to container size

✅ **Metrics Displayed**
- Reviewed Pull Requests
- Total Code Reviews
- Total Lines Accepted
- Bugs Detected
- Security Issues Found
- Code Quality Trend

## Component Structure

### 1. **Sidebar.jsx** - Navigation Panel
Location: `src/dashboard/Sidebar.jsx`

**Purpose**: Left-side navigation menu with collapsible sections

**Props**:
- `isOpen` (boolean) - Controls mobile sidebar visibility
- `setIsOpen` (function) - Function to toggle mobile menu

**Features**:
- Logo and branding
- Menu items with icons
- Expandable submenu sections
- Mobile responsive (slides in/out)
- Upgrade prompt at bottom
- Hover effects and transitions

**Menu Items**:
1. Home
2. Projects
3. Metrics
4. Resources
5. Teams
6. Automation

**Styling**:
- Light background (white)
- Blue accent color on hover
- Smooth transitions
- Mobile overlay when open

### 2. **Topbar.jsx** - Top Navigation
Location: `src/dashboard/Topbar.jsx`

**Purpose**: Header bar with title, filters, and actions

**Features**:
- Page title display
- Date range selector (7/30/90 days, 1 year)
- Team filter dropdown
- Search functionality
- Notification center with dropdown
- Share button with menu options:
  - Copy dashboard link
  - Export as CSV
  - Export as PNG
- User profile avatar
- Settings button

**Dropdowns**:
```
Share Menu Options:
├── Copy dashboard link → Copies to clipboard
├── Export as CSV → Downloads CSV file
└── Export as PNG → Downloads PNG image

Notification Center:
├── PRs Analysis Complete
├── Security Issues Detected
└── Quality Score Updated
```

**Responsive**:
- Date range and filter hide on mobile
- Search bar appears on smaller screens
- All buttons remain accessible

### 3. **MetricsChart.jsx** - Chart Component
Location: `src/dashboard/MetricsChart.jsx`

**Purpose**: Displays line charts with metric data

**Props**:
```javascript
{
  title: string,           // Chart title
  value: string,           // Current metric value
  trend: number,           // Percentage trend (positive/negative)
  data: {                  // Chart data
    labels: array,         // X-axis labels
    values: array          // Y-axis values
  },
  color: 'blue'|'green'|'purple'|'orange'|'red'
}
```

**Features**:
- Line chart with filled area
- Point indicators on data
- Hover tooltips
- Trend indicators (↑ showing percentage)
- Export button (per chart)
- "View Details" link
- Last updated timestamp
- Smooth animations

**Chart Options**:
- Responsive layout
- Custom tooltips
- Grid styling
- Point interactions
- Legend hidden by default

**Color Schemes**:
```javascript
{
  blue: RGB border with light blue background
  green: Green theme for positive metrics
  purple: Purple for mixed metrics
  orange: Orange for warnings
  red: Red for critical metrics
}
```

### 4. **DashboardCard.jsx** - Stat Card
Location: `src/dashboard/DashboardCard.jsx`

**Purpose**: Displays individual metrics with icons and trends

**Props**:
```javascript
{
  title: string,           // Card title
  value: string,           // Metric value
  trend: number,           // Percentage change
  description: string,     // Card description
  icon: Component,         // Icon component
  color: 'blue'|'green'|etc,
  action: {                // Optional action button
    label: string,
    variant: 'ghost'|'solid',
    showProgress: boolean,
    progressValue: number,
    progressLabel: string,
    footer: string
  }
}
```

**Features**:
- Large metric value display
- Trending indicators with icons
- Icon badge with color coding
- Optional progress bar
- Action button (optional)
- Description text
- Footer information
- Hover effects

**Icon Colors**: Match the color prop for consistency

### 5. **Dashboard.jsx** - Main Component
Location: `src/dashboard/Dashboard.jsx`

**Purpose**: Main dashboard container and layout manager

**Structure**:
```
Dashboard
├── Sidebar (navigation)
├── Main Content Area
│   ├── Topbar (header)
│   └── Content Grid
│       ├── Stats Cards (4 columns on desktop)
│       ├── Chart Row 1 (2 columns)
│       ├── Chart Row 2 (2 columns)
│       ├── Chart Row 3 (2 columns)
│       └── Recent Activity Section
└── Footer (last updated)
```

**Grid Layout**:
- **Desktop**: 4 columns for stat cards, 2 columns for charts
- **Tablet**: 2 columns for stat cards, 1-2 columns for charts
- **Mobile**: 1 column full width

**Data Mock**:
- Sample data sets for all metrics
- 7-day date range
- Realistic trending values
- Recent activity list

## Usage

### Basic Implementation

```javascript
import Dashboard from './dashboard/Dashboard';

function App() {
  return <Dashboard />;
}
```

### Standalone Component Usage

```javascript
// Using MetricsChart
import MetricsChart from './dashboard/MetricsChart';

<MetricsChart
  title="API Response Time"
  value="234ms"
  trend={-5}
  data={{
    labels: ['Mon', 'Tue', 'Wed'],
    values: [240, 235, 230]
  }}
  color="blue"
/>

// Using DashboardCard
import DashboardCard from './dashboard/DashboardCard';

<DashboardCard
  title="Active Users"
  value="1,234"
  trend={12}
  icon={Users}
  color="green"
  action={{
    label: 'View Details',
    variant: 'ghost'
  }}
/>
```

## Styling & Theming

### Color Palette

```css
Blue:    #3b82f6 (rgb(59, 130, 246))
Green:   #22c55e (rgb(34, 197, 94))
Purple:  #a855f7 (rgb(168, 85, 247))
Orange:  #f97316 (rgb(249, 115, 22))
Red:     #ef4444 (rgb(239, 68, 68))

Gray Scale:
50:   #f9fafb
100:  #f3f4f6
200:  #e5e7eb
300:  #d1d5db
400:  #9ca3af
500:  #6b7280
600:  #4b5563
700:  #374151
800:  #1f2937
900:  #111827
```

### Typography

```css
Headings: Font-bold (700)
Body:     Font-normal (400)
Labels:   Font-medium (500)
Small:    Text-sm with gray-600
```

### Spacing

```css
Card Padding:  1.5rem (p-6)
Grid Gap:      1.5rem (gap-6)
Section Gap:   1.5rem (space-y-6)
Icon Padding:  0.75rem (p-3)
```

## Responsive Breakpoints

```css
Mobile:   < 640px   (sm)
Tablet:   640px-1024px (md/lg)
Desktop:  > 1024px  (lg+)
```

### Responsive Behavior

**Mobile (< 640px)**:
- 1 column layout for all cards
- Sidebar slides in from left
- Date range and filters hidden
- Compact navigation
- Full-width cards

**Tablet (640px - 1024px)**:
- 2 columns for stat cards
- 1-2 columns for charts
- Sidebar visible on desktop only
- Optional dropdown show/hide

**Desktop (> 1024px)**:
- 4 columns for stat cards
- 2 columns for charts
- Sidebar always visible
- Full features displayed

## Animations

```css
Hover:     smooth 150ms transition
Shadow:    0px 0px 8px rgba(0,0,0,0.1) on hover
Rotate:    ChevronDown rotates on expand
Opacity:   0.8 on hover for certain elements
```

## Chart.js Configuration

### Plugins Used

```javascript
Chart.js Plugins:
├── CategoryScale (x-axis labels)
├── LinearScale (y-axis)
├── PointElement (dots on lines)
├── LineElement (line rendering)
├── Title
├── Tooltip (hover info)
├── Legend
└── Filler (area under line)
```

### Chart Options

```javascript
{
  responsive: true,
  maintainAspectRatio: true,
  
  plugins: {
    legend: { display: false },
    tooltip: {
      // Custom styling
      backgroundColor: 'rgba(0,0,0,0.8)',
      padding: 12,
      cornerRadius: 8
    }
  },
  
  scales: {
    y: { beginAtZero: true },
    x: { grid: { display: false } }
  }
}
```

## Data Handling

### Mock Data Structure

```javascript
const chartDataSets = {
  reviewedPRs: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [12, 19, 8, 15, 22, 18, 25]
  },
  // ... more datasets
}
```

### Real Data Integration

Replace mock data with API calls:

```javascript
useEffect(() => {
  fetchMetrics().then(data => {
    setChartData(data);
  });
}, []);
```

## Accessibility

- ✅ Semantic HTML
- ✅ ARIA labels on icons
- ✅ Keyboard navigation
- ✅ Color contrast compliance
- ✅ Readable font sizes
- ✅ Touch-friendly buttons (min 44px)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (12+)
- Edge (latest)
- Mobile browsers

## Performance Tips

1. **Lazy Load Charts**: Load Chart.js only when component mounts
2. **Memoization**: Use `React.memo()` for chart components
3. **Debounce**: Debounce resize events for responsive charts
4. **Virtual Scrolling**: For activity lists with many items
5. **Code Splitting**: Separate dashboard route for faster main app load

## Dependencies

```json
{
  "react": "^19.2.0",
  "chart.js": "^4.x.x",
  "react-chartjs-2": "^5.x.x",
  "lucide-react": "^0.285.0",
  "tailwindcss": "^3.3.6"
}
```

## Installation

Charts dependencies are already installed:

```bash
npm install chart.js react-chartjs-2 --legacy-peer-deps
```

## Future Enhancements

- [ ] Real-time data updates with WebSocket
- [ ] Custom date range picker
- [ ] Multi-metric comparison
- [ ] Data export with more formats (Excel, PDF)
- [ ] Team-specific dashboards
- [ ] Custom widget layouts
- [ ] Saved dashboard presets
- [ ] Scheduled reports
- [ ] Dark mode toggle
- [ ] SSO integration

## Troubleshooting

### Charts Not Displaying

```javascript
// Ensure Chart.js is registered
import { Chart as ChartJS, ... } from 'chart.js';
ChartJS.register(...);
```

### Responsive Issues

- Check media query breakpoints
- Verify container size is set
- Ensure grid responsive classes are applied

### Mobile Menu Not Working

- Check `sidebarOpen` state is passed
- Verify `setIsOpen` function updates state
- Check z-index values

## Support

For issues or questions:
1. Check the component props interface
2. Review the mock data structure
3. Test with real API data
4. Check console for errors

---

**Version**: 1.0.0
**Last Updated**: March 5, 2026
**Status**: Production Ready ✅
