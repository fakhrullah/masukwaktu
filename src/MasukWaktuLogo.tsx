import React from 'react'

interface MasukWaktuLogoProp {
    size: number;
    color: string;
}

function MasukWaktuLogo (prop: MasukWaktuLogoProp) {
    return (
        <svg height={prop.size} fill={prop.color} viewBox="0 0 165 27" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.06959 21H3.70959V8.4C3.70959 6.288 4.70159 5.232 6.68559 5.232H8.46159C9.62959 5.232 10.4616 5.616 10.9576 6.384C11.4216 5.616 12.2536 5.232 13.4536 5.232H15.2296C17.2136 5.232 18.2056 6.288 18.2056 8.4V21H14.8456V8.112C14.8456 7.984 14.7976 7.872 14.7016 7.776C14.6216 7.68 14.5176 7.632 14.3896 7.632H13.0936C12.9656 7.632 12.8536 7.68 12.7576 7.776C12.6776 7.872 12.6376 7.984 12.6376 8.112V21H9.27759V8.112C9.27759 7.984 9.22959 7.872 9.13359 7.776C9.05359 7.68 8.94959 7.632 8.82159 7.632H7.52559C7.39759 7.632 7.28559 7.68 7.18959 7.776C7.10959 7.872 7.06959 7.984 7.06959 8.112V21ZM30.8828 5.232C32.8668 5.232 33.8588 6.288 33.8588 8.4V21H30.4988V15.792H28.0748V21H24.7148V8.4C24.7148 6.288 25.7068 5.232 27.6908 5.232H30.8828ZM28.0748 13.2H30.4988V7.992C30.4988 7.864 30.4508 7.752 30.3548 7.656C30.2748 7.56 30.1708 7.512 30.0428 7.512H28.5308C28.4028 7.512 28.2908 7.56 28.1948 7.656C28.1148 7.752 28.0748 7.864 28.0748 7.992V13.2ZM49.1793 9.552H45.9873V8.328C45.9873 8.2 45.9393 8.088 45.8433 7.992C45.7633 7.896 45.6593 7.848 45.5313 7.848H44.2113C44.0833 7.848 43.9713 7.896 43.8753 7.992C43.7953 8.088 43.7553 8.2 43.7553 8.328V11.088C43.7553 11.216 43.7953 11.328 43.8753 11.424C43.9713 11.52 44.0833 11.568 44.2113 11.568H46.3713C48.3553 11.6 49.3473 12.656 49.3473 14.736V18.072C49.3473 20.184 48.3553 21.24 46.3713 21.24H43.5393C41.5553 21.24 40.5633 20.184 40.5633 18.072V16.464H43.7553V18.192C43.7553 18.32 43.7953 18.432 43.8753 18.528C43.9713 18.624 44.0833 18.672 44.2113 18.672H45.6993C45.8273 18.672 45.9313 18.624 46.0113 18.528C46.1073 18.432 46.1553 18.32 46.1553 18.192V15.144C46.1553 15.016 46.1073 14.904 46.0113 14.808C45.9313 14.712 45.8273 14.664 45.6993 14.664H43.5393C41.5553 14.664 40.5633 13.608 40.5633 11.496V8.4C40.5633 6.288 41.5553 5.232 43.5393 5.232H46.2033C48.1873 5.232 49.1793 6.288 49.1793 8.4V9.552ZM61.2995 5.472H64.6595V18.072C64.6595 20.184 63.6675 21.24 61.6835 21.24H58.7075C56.7235 21.24 55.7315 20.184 55.7315 18.072V5.472H59.0915V18.36C59.0915 18.488 59.1315 18.6 59.2115 18.696C59.3075 18.792 59.4195 18.84 59.5475 18.84H60.8435C60.9715 18.84 61.0755 18.792 61.1555 18.696C61.2515 18.6 61.2995 18.488 61.2995 18.36V5.472ZM80.8306 5.472L78.1906 12.6L81.3346 21H77.9026L75.5986 14.856H74.5186V21H71.1586V5.472H74.5186V11.976H75.3346L77.7586 5.472H80.8306ZM92.4149 5.472H95.3909L97.1909 17.16L98.5349 5.472H101.799L99.2789 21H95.4629L93.9029 11.472L92.3429 21H88.5269L86.0069 5.472H89.2709L90.6149 17.16L92.4149 5.472ZM114.016 5.232C116 5.232 116.992 6.288 116.992 8.4V21H113.632V15.792H111.208V21H107.848V8.4C107.848 6.288 108.84 5.232 110.824 5.232H114.016ZM111.208 13.2H113.632V7.992C113.632 7.864 113.584 7.752 113.488 7.656C113.408 7.56 113.304 7.512 113.176 7.512H111.664C111.536 7.512 111.424 7.56 111.328 7.656C111.248 7.752 111.208 7.864 111.208 7.992V13.2ZM133.368 5.472L130.728 12.6L133.872 21H130.44L128.136 14.856H127.056V21H123.696V5.472H127.056V11.976H127.872L130.296 5.472H133.368ZM138.328 8.328V5.472H146.728V8.328H144.208V21H140.848V8.328H138.328ZM158.007 5.472H161.367V18.072C161.367 20.184 160.375 21.24 158.391 21.24H155.415C153.431 21.24 152.439 20.184 152.439 18.072V5.472H155.799V18.36C155.799 18.488 155.839 18.6 155.919 18.696C156.015 18.792 156.127 18.84 156.255 18.84H157.551C157.679 18.84 157.783 18.792 157.863 18.696C157.959 18.6 158.007 18.488 158.007 18.36V5.472Z"/>
        </svg>
    )
}

export {
    MasukWaktuLogo
}
