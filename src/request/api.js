const baseURL = process.env.baseURL;

const nftbaseURL = "";
localStorage.baseURL=baseURL
export const apiUtil = {
	"imgurl":"",//ipfs
	"login" : baseURL+"/login",
    "reward_getOne" : baseURL+"/reward/getOne",
    "reward_sign" : baseURL+"/reward/sign",
    "reward_continuity" : baseURL+"/reward/continuity",
    "reward_turntable" : baseURL+"/reward/turntable",
    "getassets" : baseURL+"/getassets",
    "withdraw" : baseURL+"/withdraw",
    "getRechargeAddress" : baseURL+"/getRechargeAddress",
    "withdrawrecharge" : baseURL+"/withdrawrecharge",
    "queryone" : baseURL+"/grade/queryAward",
    "gardeRecord" : baseURL+"/grade/getRewards",
    "levels" : baseURL+"/levels",
    "levelLogReward" : baseURL+"/levelLogReward",
    "month" : baseURL+"/reward/month",
    "updateHead" : baseURL+"/updateHead",
    "getTokenBytokenId" : baseURL+"/getTokenBytokenId",
    "getMintData" : nftbaseURL+"/box/getMintData",
    "getmyp2elist" : baseURL+"/p2e/getmyp2elist",
    "getmylastp2e" : baseURL+"/p2e/getmylastp2e",
    "getnoticelist" : baseURL+"/notice/getnoticelist",
    "getnoticebyid" : baseURL+"/notice/getnoticebyid",
    "getrankinglist" : baseURL+"/p2e/getrankinglist",
    "updateNickName" : baseURL+"/updateNickName",
    "updateNFTLevel" : baseURL+"/updateNFTLevel",
    "getLevel" : baseURL+"/getLevel",
    "openBox" : baseURL+"/openBox",
    "fileUpdate" : baseURL+"/fileUpdate",
    "getPrizeLst" : baseURL+"/getPrizeLst",
    "getPrize" : baseURL+"/getPrize",
    "getPrizeNumber" : baseURL+"/getPrizeNumber",
    "getSignWeek" : baseURL+"/reward/getSignWeek",
    "getValidQuantity" : baseURL+"/getValidQuantity",
    "invitationLst" : baseURL+"/invitationLst",
    "getMemberLevel" : baseURL+"/getMemberLevel",
    "auth" : baseURL+"/auth",

    // "getRebateRewardInfo": baseURL+"/getRebateRewardInfo",


    "getRebateRewardFriendsInfo": baseURL+"/getRebateRewardFriendsInfo",// 好友信息
    "getRebateRewardTopInfo": baseURL+"/getRebateRewardTopInfo", // nft 头部
    "getRebateRewardInfoList": baseURL+"/getRebateRewardInfoList", // nft 质押
    "getMyTeamInfo": baseURL+"/getMyTeamInfo", //获取玩家团队
    "getBlindBoxTaskForWeekProgress": baseURL+"/getBlindBoxTaskForWeekProgress", //获取得周质押进度
    "getGameRedcord": baseURL + "/getGameRedcord", //游戏记录
   

}
