interface HeaderConfig {
  title: string;
  items: {
    url: string;
    text: string;
    constantName: string;
    title: string;
    description: string;
    desc: string;
    isNew?: boolean;
  }[];
}

const HEADER_CONFIG: HeaderConfig[] = [
  {
    title: "Video Apps",
    items: [
      {
        url: "/",
        text: "Video to Video",
        constantName: "video2video.gif",
        title: "Video to Video",
        description: "Turn your video into different anime style videos",
        desc: "videoToVideo_desc",
        isNew: true,
      },
      {
        url: "/",
        text: "AI Video Generator",
        constantName: "aiVideoGenerator.webp",
        title: "AI Video Generator",
        description: "Turn text or image to video, bring your vision to life!",
        desc: "aiVideoGenerator_desc",
      },
      {
        url: "/",

        text: "Creative Style Transfer",
        constantName: "creativeStyleTransfer.gif",
        title: "Creative Style Transfer",
        description: "Transfer your video into a creative style.",
        desc: "creativeStyleTransfer_desc",
      },
      {
        url: "/",
        text: "Video Face Swap",
        constantName: "videoFaceSwap.gif",
        title: "Video Face Swap",
        description: "Change any face in videos with our AI video face swapper",
        desc: "videoFaceSwap_desc",
      },

      {
        url: "/",
        text: "Character Animation",
        constantName: "characterAnimation.gif",
        title: "Character Animation",
        description: "Creating character animation with only one image.",
        desc: "characterAnimation_desc",
      },
      {
        url: "/",

        text: "Go Act",
        constantName: "goAct.gif",
        title: "Go Act",
        description: "Video brings characters to life - everyone's an actor with Go Act",
        desc: "goAct_desc",
      },

      {
        url: "/",
        text: "Video Effect",
        constantName: "videoEffect.png",
        title: "Video Effect",
        description: "Add video effects to your video",
        desc: "videoEffect_desc",
        isNew: true,
      },

      {
        url: "/",
        text: "Consistent Character Video",
        constantName: "consistentCharacterVideo.webp",
        title: "Consistent Character Video",
        description: "Create a video with a consistent character",
        desc: "consistentCharacterVideo_desc",
        isNew: true,
      },
    ],
  },
  {
    title: "Image Apps",
    items: [
      {
        url: "/",
        text: "Text To Image",
        constantName: "textToImage.webp",
        title: "Text To Image",
        description: "Convert text to image using powerful Image Generation",
        desc: "textToImage_desc",
      },
      {
        url: "/",
        text: "Image Face Swap",
        constantName: "imageFaceSwap.webp",
        title: "Image Face Swap",
        description: "Seamlessly swap faces in your photos.",
        desc: "imageFaceSwap_desc",
      },
      {
        url: "/",
        text: "Image to Prompt",
        constantName: "imageToPrompt.webp",
        title: "Image to Prompt",
        description: "Convert images to detailed text prompts with our AI-powered tool.",
        desc: "imageToPrompt_desc",
      },
      {
        url: "/",

        text: "Image Enhancer",
        constantName: "imageEnhancer.gif",
        title: "Image Enhancer",
        description: "Enhance and upscale your image to extreme detail",
        desc: "imageEnhancer_desc",
      },
      {
        url: "/",

        text: "Image Blender",
        constantName: "imageBlender.gif",
        title: "Image Blender",
        description: "Blend multiple images into one, create unique images with AIl",
        desc: "imageBlender_desc",
        isNew: true,
      },
      {
        url: "/",
        text: "AI Logo Generator",
        constantName: "aiLogoGenerator.webp",
        title: "AI Logo Generator",
        description: "Create a logo with AI",
        desc: "aiLogoGenerator_desc",
      },
    ],
  },
];

export default HEADER_CONFIG;
