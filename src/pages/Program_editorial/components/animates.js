/**
animate-duration: 2s;    //动画持续时间
animate-delay: 1s;    //动画延迟时间
animate-iteration-count: 2;    //动画执行次数
动画效果
 */ 

export default [
    {label:'淡入淡出',className:{in:'fadeIn',out:'fadeOut'},value:1},
    {label:'从上淡入淡出',className:{in:'fadeInDown',out:'fadeOutDown'},value:2},
    {label:'从下变大淡入淡出',className:{in:'fadeInDownBig',out:'fadeOutDownBig'},value:3},
    {label:'从左淡入淡出',className:{in:'fadeInLeft',out:'fadeOutLeft'},value:4},
    {label:'从左变大淡入淡出',className:{in:'fadeInLeftBig',out:'fadeOutRightBig'},value:5},
    {label:'从右淡入淡出',className:{in:'fadeInRight',out:'fadeOutRight'},value:6},
    {label:'从右变小小淡入淡出',className:{in:'fadeInRightBig',out:'fadeOutRightBig'},value:7},
    {label:'从下淡入淡出',className:{in:'fadeInUp',out:'fadeOutUp'},value:8},
    {label:'从小变大淡入淡出',className:{in:'fadeInUpBig',out:'adeOutUpBig'},value:9}
];