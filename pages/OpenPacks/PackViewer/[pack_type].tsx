import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import React, { useState } from 'react';
import AnimatedPackViewer from './AnimatedPackViewer';
import useStyles from './PackViewer.styles';
import StaticPackViewer from './StaticPackViewer';

const mockCards = [
  {
    player_name: "Darrel Williams",
    player_team: "Baltimore Hawks",
    rarity: "Star",
    image_url: "https://i.imgur.com/pQCWko3.png",
  },
  {
    player_name: "Bruce Buckley",
    player_team: "Arizona Outlaws",
    rarity: "Starter",
    image_url: "https://i.ibb.co/RD4D42N/Bruce-Buckley.png"
  },
  {
    player_name: "Sardine Bean",
    player_team: "Baltimore Hawks",
    rarity: "Backup",
    image_url: "https://i.imgur.com/ilx8JNQ.png"
  },
  {
    player_name: "Pete Parker",
    player_team: "Colorado Yeti",
    rarity: "All-Pro",
    image_url: "https://i.imgur.com/NySSiLQ.jpg"
  },
  {
    player_name: "Forrest Gump",
    player_team: "New Orleans Second Line",
    rarity: "Legend",
    image_url: "https://i.imgur.com/kUbBRFS.png"
  },
  {
    player_name: "Ian Bavitz",
    player_team: "Orange County Otters",
    rarity: "Hall of Fame",
    image_url: "https://media.discordapp.net/attachments/721761354846961716/736011625747841084/bavitz.png?width=441&height=618"
  }
];

const PackViewer = () => {
  const [viewStyle, setViewStyle] = useState('animated');
  const classes = useStyles();
  const handleViewStyle = (event, newViewStyle) => {
    setViewStyle(newViewStyle);
  };

  return (
    <div className={classes.packViewerContainer}>
      { viewStyle === 'animated' && <AnimatedPackViewer cards={mockCards} />}
      { viewStyle === 'static' && <StaticPackViewer cards={mockCards} />}
      <ToggleButtonGroup className={classes.viewStyleGroup} value={viewStyle} exclusive onChange={handleViewStyle} aria-label="text formatting">
        <ToggleButton value="animated" aria-label="animated">
          Animated View
  </ToggleButton>
        <ToggleButton value="static" aria-label="static">
          Static View
  </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}

export default PackViewer;