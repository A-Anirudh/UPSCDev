import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
const sideItems = [
  { name: 'Home', icon: <HomeOutlinedIcon />, link: '/home' },
  { name: 'Affairs', icon: <NewspaperOutlinedIcon />, link: '/affair?all=true' },
  { name: 'Favorites', icon: <FavoriteBorderOutlinedIcon />, link: '/fav' },
  { name: 'Payments', icon: <AccountBalanceWalletOutlinedIcon />, link: '/payment-subscription' },
  { name: 'Profile', icon: <AccountCircleOutlinedIcon />, link: '/profile' },



];





    export  default sideItems