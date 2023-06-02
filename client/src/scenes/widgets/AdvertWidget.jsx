import { Button, Typography, useTheme } from "@mui/material";
import FlexBetween from "../components/FlexBetween";
import WidgetWrapper from "../components/WidgetWrapper";
import axios from "axios"

const AdvertWidget = () => {

  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const handleClick = () =>{
    // window.location.href = "jayrambagal00@gmail.com"
    window.location.href = "https://jayrambagal.vercel.app/"
  }

  const checkoutHandler = async(amount) =>{

    console.log(amount);

    const {data:{key}} = await axios.get("http://localhost:3002/api/getkey")

    const {data:{order}} = await axios.post("http://localhost:3002/api/checkout",{
        amount
        
    })
    console.log(order);

    var options = {
        key, 
        amount: order.amount, 
        currency: "INR",
        name: "Jayram Bagal",
        description: "Test Transaction",
        image: "https://avatars.githubusercontent.com/u/94613732?s=400&u=7dd4a83e8029e706d486a74e75292303f1af8976&v=4",
        order_id: order.id, 
        callback_url: "http://localhost:3002/api/paymentVerification",
        prefill: {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9000090000"
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#3399cc"
        }
    };
    const razor = new window.Razorpay(options);
    razor.open();
    razor.open()

}

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="https://jayrambagal.vercel.app/assets/images/jayAvatar.png"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Jayram Bagal</Typography>
        <Typography color={medium} onClick={handleClick}>
        <p style={{cursor:"pointer"}}>jayrambagal.com</p>
        {/* <Link to="https://jayrambagal.vercel.app/" style={{cursor:"pointer"}} >jayrambagal.com</Link> */}
        </Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Hey, I am Jay, Hire me as a  devloper
      </Typography>

      <Button
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
            width:"100%",
            marginTop:"5px"
          }}
          onClick={() => checkoutHandler(100)}
        >
          Buy me a ☕
        </Button>
    </WidgetWrapper>
  );
};

export default AdvertWidget;