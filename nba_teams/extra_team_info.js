// TO FINISH






// Example mapping of NBA teams to logos and colors
const nbaTeams = {
  "Atlanta Hawks": {
    logo: "https://loodibee.com/wp-content/uploads/nba-atlanta-hawks-logo.png",
    colors: ["#e03a3e", "#c1d32f", "#26282a"],
  },
  "Boston Celtics": {
    logo: "https://loodibee.com/wp-content/uploads/nba-boston-celtics-logo.png",
    colors: ["#007a33", "#ba9653", "#963821"],
  },
  "Brooklyn Nets": {
    logo: "https://loodibee.com/wp-content/uploads/nba-brooklyn-nets-logo.png",
    colors: ["#000000", "#ffffff"],
  },
  "Charlotte Hornets": {
    logo: "https://loodibee.com/wp-content/uploads/nba-charlotte-hornets-logo.png",
    colors: ["#1d1160", "#00788c", "#a1a1a4"],
  },
  "Chicago Bulls": {
    logo: "https://loodibee.com/wp-content/uploads/nba-chicago-bulls-logo.png",
    colors: ["#ce1141", "#000000"],
  },
  "Cleveland Cavaliers": {
    logo: "https://loodibee.com/wp-content/uploads/Clevelan-Cavaliers-logo-2022.png",
    colors: ["#860038", "#041e42", "#fdbb30"],
  },
  "Dallas Mavericks": {
    logo: "https://loodibee.com/wp-content/uploads/nba-dallas-mavericks-logo.png",
    colors: ["#00538c", "#002b5e", "#b8c4ca"],
  },
  "Denver Nuggets": {
    logo: "https://loodibee.com/wp-content/uploads/nba-denver-nuggets-logo-2018.png",
    colors: ["#0e2240", "#fec524", "#8b2131", "#1d428a"],
  },
  "Detroit Pistons": {
    logo: "https://loodibee.com/wp-content/uploads/nba-detroit-pistons-logo.png",
    colors: ["#c8102e", "#1d42ba", "#bec0c2", "#002d62"],
  },
  "Golden State Warriors": {
    logo: "https://loodibee.com/wp-content/uploads/nba-golden-state-warriors-logo-2020.png",
    colors: ["#1d428a", "#ffc72c"],
  },
  "Houston Rockets": {
    logo: "https://example.com/boston-celtics-logo.png",
    colors: ["#ce1141", "#c4ced4", "#000000"],
  },
  "Indiana Pacers": {
    logo: "https://example.com/boston-celtics-logo.png",
    colors: ["#002d62", "#fdbb30", "#bec0c2"],
  },
  "Los Angeles Clippers": {
    logo: "https://example.com/boston-celtics-logo.png",
    colors: ["#c8102e", "#1d428a", "#bec0c2", "#000000"],
  },
  "Los Angeles Lakers": {
    logo: "https://example.com/boston-celtics-logo.png",
    colors: ["#552583", "#f9a01b", "#000000"],
  },
  "Memphis Grizzlies": {
    logo: "https://example.com/boston-celtics-logo.png",
    colors: ["#5d76a9", "#12173f", "#f5b112", "#707271"],
  },
  "Miami Heat": {
    logo: "https://example.com/boston-celtics-logo.png",
    colors: ["#98002e", "#f9a01b", "#000000"],
  },
  "Milwaukee Bucks": {
    logo: "https://example.com/boston-celtics-logo.png",
    colors: ["#00471b", "#eee1c6", "#000000", "#0077c0"],
  },
  "Minnesota Timberwolves": {
    logo: "https://example.com/boston-celtics-logo.png",
    colors: ["#0c2340", "#236192", "#9ea2a2", "#78be20"],
  },
  "New Orleans Pelicans": {
    logo: "https://example.com/boston-celtics-logo.png",
    colors: ["#0c2340", "#c8102e", "#85714d"],
  },
  "New York Knicks": {
    logo: "https://example.com/boston-celtics-logo.png",
    colors: ["#006bb6", "#f58426", "#000000", "#bec0c2"],
  },
  "Oklahoma City Thunder": {
    logo: "https://example.com/boston-celtics-logo.png",
    colors: ["#007ac1", "#ef3b24", "#002d62", "#fdbb30"],
  },
  "Orlando Magic": {
    logo: "https://example.com/boston-celtics-logo.png",
    colors: ["#0077c0", "#c4ced4", "#000000"],
  },
  "Philadelphia 76ers": {
    logo: "https://example.com/boston-celtics-logo.png",
    colors: ["#006bb6", "#ed174c", "#002b5c", "#c4ced4"],
  },
  "Pheonix Suns": {
    logo: "https://example.com/boston-celtics-logo.png",
    colors: ["#1d1160", "#e56020", "#000000"],
  },
  "Portland Trail Blazers": {
    logo: "https://example.com/boston-celtics-logo.png",
    colors: ["#e03a3e", "#000000"],
  },
  "Sacramento Kings": {
    logo: "https://example.com/boston-celtics-logo.png",
    colors: ["#5a2d81", "#63727a", "#000000"],
  },
  "San Antonio Spurs": {
    logo: "https://example.com/boston-celtics-logo.png",
    colors: ["#c4ced4", "#000000"],
  },
  "Toronto Raptors": {
    logo: "https://example.com/boston-celtics-logo.png",
    colors: ["#ce1141", "#a1a1a4", "#000000"],
  },
  "Utah Jazz": {
    logo: "https://example.com/boston-celtics-logo.png",
    colors: ["#002b5c", "#00471b", "#f9a01b"],
  },
  "Washington Wizards": {
    logo: "https://example.com/boston-celtics-logo.png",
    colors: ["#002b5c", "#e31837", "#c4ced4"],
  },
};



// Function to get team information by team name
function getTeamInfo(teamName) {
  return nbaTeams[teamName] || null;
}

// Example usage
const teamName = "Boston Celtics";
const teamInfo = getTeamInfo(teamName);

if (teamInfo) {
  console.log(`Team: ${teamName}`);
  console.log(`Logo: ${teamInfo.logo}`);
  console.log(`Colors: ${teamInfo.colors.join(", ")}`);
} else {
  console.log(`Team not found: ${teamName}`);
}
