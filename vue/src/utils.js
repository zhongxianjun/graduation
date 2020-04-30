var gloab = [];

var mesArr = [
  {
      "question": "痛风病能治好吗？",
      "answer": "治疗最重要的是低嘌呤食物，轻症注意饮食就可以控制住，即使是严重的需要注意饮食 ，这个是药物治疗的基础，否则治疗效果不好的 。"
  },
  {
      "question": "痛风病应该如何饮食？",
      "answer": "你好，痛风患者日常可选择大米，玉米，小麦等偏碱性类的食物。多吃冬瓜，南瓜，苹果，柠檬等含嘌呤少或不含嘌呤的蔬菜水果。日常适当运动，增加抵抗力，避免受寒受潮。"
  },
  {
      "question": "痛风病人能吃鱼吗",
      "answer": "痛风属于代谢性疾病，是由于嘌呤代谢异常引起的高尿酸血症，由于痛风患者会出现关节肿胀、剧烈疼痛，对于患者非常痛苦。对于痛风的治疗除服用药物治疗外，饮食的控制非常重要，避免食用高嘌呤食物如动物内脏、骨髓、肉类、海鲜及海产品。建议多吃清淡、低盐、低脂食物、多吃新鲜水果蔬菜大量喝水.."
  }
];

var otherMesArr = [
  {
    "question": "痛风病能治好吗？",
    "answer": "治疗最重要的是低嘌呤食物，轻症注意饮食就可以控制住，即使是严重的需要注意饮食 ，这个是药物治疗的基础，否则治疗效果不好的 。"
  },
  {
      "question": "痛风病应该如何饮食？",
      "answer": "你好，痛风患者日常可选择大米，玉米，小麦等偏碱性类的食物。多吃冬瓜，南瓜，苹果，柠檬等含嘌呤少或不含嘌呤的蔬菜水果。日常适当运动，增加抵抗力，避免受寒受潮。"
  },
  {
      "question": "痛风病人能吃鱼吗",
      "answer": "痛风属于代谢性疾病，是由于嘌呤代谢异常引起的高尿酸血症，由于痛风患者会出现关节肿胀、剧烈疼痛，对于患者非常痛苦。对于痛风的治疗除服用药物治疗外，饮食的控制非常重要，避免食用高嘌呤食物如动物内脏、骨髓、肉类、海鲜及海产品。建议多吃清淡、低盐、低脂食物、多吃新鲜水果蔬菜大量喝水.."
  }
];

function unique (arr) {   //数组去重函数
  for(var i=0; i<arr.length; i++){
      for(var j=i+1; j<arr.length; j++){
          if(arr[i].question == arr[j].question){       //第一个等同于第二个，splice方法删除第二个
              arr.splice(j,1);
              j--;
          }
      }
  }
  return arr;
}  

var allMesArr = unique(otherMesArr.concat(mesArr));




var user = [
  {
    userName: 201601,
    pwd: 123456
  },
  {
    userName: 'admin',
    pwd: 'admin'
  },
  {
    userName: 201602,
    pwd: 123456
  },
  {
    userName: 201622,
    pwd: 123456
  }
]

export default{
  gloab,
  mesArr,
  otherMesArr,
  allMesArr,
  user,
  unique
}