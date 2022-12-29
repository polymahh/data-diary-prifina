import { extendTheme, theme as base } from "@chakra-ui/react";

const theme = extendTheme({
   
    styles:{
      global:{
        body:{
          backgroundColor:"bg"
        }
      }
    },
    
  
    colors:{
        logoColor:"#5D5DAC",
       primary:"#8675CB",
       secondary:"#808099",
       number:"#A2A2BD",
       bg:"#F6F5FA",
       bgSecondary:"#E8E5F2",
       border:"#EEEBF8",
       dotedBr:"#ECE9F9",

    },
    fonts: {
      body: `Inter,Josefin Sans,Open Sans, ${base.fonts}`
    },
    
})

export default theme;