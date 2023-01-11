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
      pin:"#F05D5D",
      // health
      healthPrimary:"#73A1F6",
      healthBG:"#E7F0FF",
      healthBorder:"#CADDFC",
      health:{
        50:"#abc7fa",
        100:"#9dbdf9",
        200:"#E7F0FF",
        300:"#8fb4f8",
        400:"#81aaf7",
        500:"#73A1F6",
        600:"#6891dd",
        700:"#5c81c5",
        800:"#5171ac",
        900:"#456194",
      },
      fitness:{
        50:"#f8c9b8",
        100:"#f6bea9",
        200:"#f5b39b",
        300:"#f3a88d",
        400:"#f29d7e",
        500:"#f09270",
        600:"#d88365",
        700:"#c0755a",
        800:"#a8664e",
        900:"#905843",
      },
      route:{
        50:"#c6e6c5",
        100:"#bae1b9",
        200:"#afdcad",
        300:"#a3d7a1",
        400:"#98d296",
        500:"#8ccd8a",
        600:"#7eb97c",
        700:"#70a46e",
        800:"#629061",
        900:"#547b53",
      },
      business:{
        50:"#d6c3ff",
        100:"#cdb7fe",
        200:"#c5abfe",
        300:"#bd9ffe",
        400:"#b493fe",
        500:"#ac87fe",
        600:"#9b7ae5",
        700:"#8a6ccb",
        800:"#785fb2",
        900:"#675198",
      },
      personal:{
        50:"#e6b4ee",
        100:"#e0a5ea",
        200:"#db96e7",
        300:"#d687e3",
        400:"#d178e0",
        500:"#CC69DC",
        600:"#b85fc6",
        700:"#a354b0",
        800:"#8f4a9a",
        900:"#7a3f84",
      },
      

    },
    fonts: {
      body: `Inter,Josefin Sans,Open Sans, ${base.fonts}`
    },
    
})

export default theme;