import Svg, { Circle, ClipPath, Defs, G, LinearGradient, Path, Stop, SvgProps } from 'react-native-svg'

export const BugIcon = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} fill="none" {...props}>
    <G filter="url(#a)">
      <Circle cx={25} cy={25} r={15} fill="url(#b)" />
    </G>
    <G clipPath="url(#c)">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M27.522 17.515a.034.034 0 0 1 .048-.009l1.065.746c.016.01.02.032.009.048l-1.483 2.117c.721.23 1.212.479 1.212.479s-1.2 2.064-3.236 2.064c-2.035 0-3.482-1.924-3.482-1.924s.513-.327 1.274-.608l-1.626-1.938a.034.034 0 0 1 .004-.048l.996-.836a.034.034 0 0 1 .048.004l2.06 2.454c.175-.02.355-.031.536-.031.26 0 .52.02.775.053l1.8-2.571Zm.403 5.543c.543-.388 1.365-1.4 1.365-1.4s2.1 1.663 2.1 5.19c0 3.529-3.63 5.652-3.63 5.652s-1.734-1.752-2.16-3.972c-.426-2.22.63-4.685.63-4.685s1.152-.397 1.695-.785Zm-5.85 0c-.543-.388-1.365-1.4-1.365-1.4s-2.1 1.663-2.1 5.19c0 3.529 3.63 5.652 3.63 5.652s1.734-1.752 2.16-3.972c.426-2.22-.63-4.685-.63-4.685s-1.152-.397-1.695-.785Z"
        clipRule="evenodd"
      />
    </G>
    <Defs>
      <LinearGradient id="b" x1={25} x2={25} y1={10} y2={40} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#AFC836" />
        <Stop offset={1} stopColor="#92BC2C" />
      </LinearGradient>
      <ClipPath id="c">
        <Path fill="#fff" d="M17.5 17.5h15v15h-15z" />
      </ClipPath>
    </Defs>
  </Svg>
)
