var OakBottleTastingLog = require("./../models/OakBottleTastingLog");
var TastingLogLive = require("./../models/TastingLogLive");
var _ = require("lodash");

var ProfileListener = function Constructor() {};
ProfileListener.prototype.runCron = async function (callbackForCron) {
  try {
    /* let testingLogs = await OakBottleTastingLog.find({}, '_id likes').skip(1500);
    if (testingLogs && !_.isEmpty(testingLogs)) {
      testingLogs = JSON.parse(JSON.stringify(testingLogs));
      testingLogs = await Promise.all(
        testingLogs.map(async (testingLogDetail) => {
          if (testingLogDetail.likes) {
            const likeCount = _.size(testingLogDetail.likes);
            let details = await OakBottleTastingLog.findOne({
              _id: testingLogDetail._id,
            });
            
            if (details) {
              details.likeCount = likeCount;
              const status = await details.save();
            }
          }
        })
      );
    } */

    let testingLogs = await TastingLogLive.find({ image: "blog" });
    console.log('testingLogs', testingLogs);

    if (testingLogs && !_.isEmpty(testingLogs)) {
      testingLogs = JSON.parse(JSON.stringify(testingLogs));
      testingLogs = await Promise.all(
        testingLogs.map(async (testingLogDetail) => {
          console.log('testingLogDetail', testingLogDetail);
          const mainEntry = await OakBottleTastingLog.findOne({
            _id: testingLogDetail._id,
          });
          if (mainEntry) {
            if (testingLogDetail.isBlog) {
              mainEntry.isBlog = testingLogDetail.isBlog;
            }
            if (testingLogDetail.blogData) {
              mainEntry.blogData = testingLogDetail.blogData;
            }
            if (testingLogDetail.caption) {
              mainEntry.caption = testingLogDetail.caption;
            }
            if (testingLogDetail.thumbnail) {
              mainEntry.thumbnail = testingLogDetail.thumbnail;
            }
            if (testingLogDetail.hidden) {
              mainEntry.hidden = testingLogDetail.hidden;
            }
            await mainEntry.save();
          }
          /* if (testingLogDetail.likes) {
            const likeCount = _.size(testingLogDetail.likes);
            let details = await OakBottleTastingLog.findOne({
              _id: testingLogDetail._id,
            });
            
            if (details) {
              details.likeCount = likeCount;
              const status = await details.save();
            }
          } */
        })
      );
    }

    console.log("It ends...");
    callbackForCron();
  } catch (e) {
    console.log("It comes in error");
    console.log(e);
  }
};
module.exports = ProfileListener;
