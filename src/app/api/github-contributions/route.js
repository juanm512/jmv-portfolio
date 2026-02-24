import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    return NextResponse.json({ error: 'GITHUB_TOKEN environment variable not set' }, { status: 500 });
  }

  const query = `
    query {
      user(login: "juanm512") {
        y2025: contributionsCollection(from: "2025-01-01T00:00:00Z", to: "2025-12-31T23:59:59Z") {
          contributionCalendar { weeks { contributionDays { contributionCount date } } }
        }
        y2024: contributionsCollection(from: "2024-01-01T00:00:00Z", to: "2024-12-31T23:59:59Z") {
           contributionCalendar { weeks { contributionDays { contributionCount date } } }
        }
        y2023: contributionsCollection(from: "2023-01-01T00:00:00Z", to: "2023-12-31T23:59:59Z") {
           contributionCalendar { weeks { contributionDays { contributionCount date } } }
        }
        y2022: contributionsCollection(from: "2022-01-01T00:00:00Z", to: "2022-12-31T23:59:59Z") {
           contributionCalendar { weeks { contributionDays { contributionCount date } } }
        }
        y2021: contributionsCollection(from: "2021-01-01T00:00:00Z", to: "2021-12-31T23:59:59Z") {
           contributionCalendar { weeks { contributionDays { contributionCount date } } }
        }
        y2020: contributionsCollection(from: "2020-01-01T00:00:00Z", to: "2020-12-31T23:59:59Z") {
           contributionCalendar { weeks { contributionDays { contributionCount date } } }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 86400 } 
    });

    const data = await response.json();
    
    if (data.errors) {
       return NextResponse.json({ error: 'GraphQL Errors', details: data.errors }, { status: 500 });
    }

    const user = data.data?.user;
    if (!user) {
      return NextResponse.json({ chartData: [] });
    }

    // Combine all years in chronological order
    const years = [user.y2020, user.y2021, user.y2022, user.y2023, user.y2024, user.y2025];
    let cumulativeCount = 0;
    const chartData = [];

    years.forEach(yearData => {
      const weeks = yearData?.contributionCalendar?.weeks || [];
      weeks.forEach(week => {
        week.contributionDays.forEach(day => {
          cumulativeCount += day.contributionCount;
          chartData.push({
            date: day.date,
            count: day.contributionCount,
            total: cumulativeCount
          });
        });
      });
    });

    return NextResponse.json({ chartData });
  } catch (error) {
    return NextResponse.json({ error: 'Exception fetching GitHub data', details: error.message }, { status: 500 });
  }
}
