import Svg, { Circle, ClipPath, Defs, G, LinearGradient, Path, Stop, SvgProps } from 'react-native-svg'

export const GrassIcon = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} fill="none" {...props}>
    <G filter="url(#a)">
      <Circle cx={25} cy={25} r={15} fill="url(#b)" />
    </G>
    <G clipPath="url(#c)">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M20.463 30.38a6.803 6.803 0 0 1-.153-9.77c2.657-2.656 11.122-2.834 11.122-2.834s1.156 9.799-1.5 12.456a6.805 6.805 0 0 1-8.673.791l2.136-2.62 3.415-.738-2.788-.279 1.772-1.803 2.016-.442-1.594-.472 1.594-2.876-2.268 2.543-.876-1.235.309 2.04-1.58 1.78-.732-2.252v2.996l-2.2 2.715Z"
        clipRule="evenodd"
      />
    </G>
    <Defs>
      <LinearGradient id="b" x1={10} x2={10} y1={10} y2={40} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#5AC178" />
        <Stop offset={1} stopColor="#5FBC51" />
      </LinearGradient>
      <ClipPath id="c">
        <Path fill="#fff" d="M17.5 17.5h15v15h-15z" />
      </ClipPath>
    </Defs>
  </Svg>
)
