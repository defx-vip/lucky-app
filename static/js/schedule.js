(function(undefined) {
	var _global;
	function extend(def, opt, override) {
		for(var k in opt) {
			if(opt.hasOwnProperty(k) && (!def.hasOwnProperty(k) || override)) {
				def[k] = opt[k]
			}
		}
		return def;
	}
	var obj
	if(localStorage.locale=='zh'){
		obj = {
		'01': '1月',
		'02': '2月',
		'03': '3月',
		'04': '4月',
		'05': '5月',
		'06': '6月',
		'07': '7月',
		'08': '8月',
		'09': '9月',
		'10': '10月',
		'11': '11月',
		'12': '12月'
		}
	}else{
		obj = {
		'01': 'January',
		'02': 'February',
		'03': 'March',
		'04': 'April',
		'05': 'May',
		'06': 'June',
		'07': 'July',
		'08': 'August',
		'09': 'Septemper',
		'10': 'October',
		'11': 'November',
		'12': 'December'
		}
	}
	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i].trim();
			if(c.indexOf(name) == 0) return c.substring(name.length, c.length);
		}
		return "";
	}
	function formartDate(y, m, d, symbol) {
		symbol = symbol || '-';
		m = (m.toString())[1] ? m : '0' + m;
		d = (d.toString())[1] ? d : '0' + d;
		return obj[m] + '   ' + y
		//		return (y+symbol+m+symbol+d).substring(0,4)
	}

	function Schedule(opt) {
		var def = {},
			opt = extend(def, opt, true),
			curDate = opt.date ? new Date(opt.date) : new Date(),
			year = curDate.getFullYear(),
			month = curDate.getMonth(),
			day = curDate.getDate(),
			currentYear = curDate.getFullYear(),
			currentMonth = curDate.getMonth(),
			currentDay = curDate.getDate(),
			selectedDate = '',
			ela = document.querySelector(opt.ela),
			_this = this;
		var bindEvent = function() {
			ela.addEventListener('click', function(e) {

				switch(e.target.id) {
					case 'nextMonth':
						_this.nextMonthFun();
						break;
					case 'nextYear':
						_this.nextYearFun();
						break;
					case 'prevMonth':
						_this.prevMonthFun();
						break;
					case 'prevYear':
						_this.prevYearFun();
						break;
					default:
						break;
				};
				if(e.target.className.indexOf('currentDate') > -1) {

					selectedDate = e.target.title;
					day = e.target.innerHTML;
					var date = selectedDate;
					date = new Date(Date.parse(date.replace(/-/g, "/")));
					date = date.getTime();
					var date1 = new Date(new Date().toLocaleDateString()).getTime();
					if(Number(date) > Number(date1)) {
						return false
					}
					opt.clickCb && opt.clickCb(year, month + 1, e.target.innerHTML);
					render();
				}
			}, false)
		}
		var init = function() {
			var scheduleHd = '<div class="schedule-hd">' +
				'<div>' +
				'<span class="arrow icon iconfont icon-116leftarrowheads" id="prevYear" ></span>' +
				'<span class="arrow icon iconfont icon-112leftarrowhead" id="prevMonth"></span>' +
				'</div>' +
				'<div class="today">' + formartDate(year, month + 1, day, '-') + '</div>' +
				'<div>' +
				'<span class="arrow icon iconfont icon-111arrowheadright" id="nextMonth"></span>' +
				'<span class="arrow icon iconfont icon-115rightarrowheads" id="nextYear"></span>' +
				'</div>' +
				'</div>'
			var scheduleWeek = '<ul class="week-ul ul-box">' +
				'<li>Sun</li>' +
				'<li>Mon</li>' +
				'<li>Tue</li>' +
				'<li>Wed</li>' +
				'<li>Thu</li>' +
				'<li>Fri</li>' +
				'<li>Sat</li>' +
				'</ul>'
			var scheduleBd = '<ul class="schedule-bd ul-box" ></ul>';
			ela.innerHTML = scheduleHd + scheduleWeek + scheduleBd;
			bindEvent();
			render();
		}
		var render = function() {
			let mmo = month + 1
			mmo = (mmo.toString())[1] ? mmo : '0' + mmo;
			$.ajax({
				url: localStorage.baseURL+"/reward/month",
				type: "post",
				xhrFields: {
      				withCredentials: true
    			},
				data: JSON.stringify({
					playerId: getCookie("playerId"),
					walletAddress: getCookie("walletAddress"),
					signDate: year + "-" + mmo
				}),
				headers: {
					'Content-Type': 'application/json',
					'lan':localStorage.locale || 'en',
					'token':getCookie("token"),
				},
				success: function(res) {
					if(res.data.code == 5000) {
						close();
						return false;
					}
					var fullDay = new Date(year, month + 1, 0).getDate(), 
						startWeek = new Date(year, month, 1).getDay(), 
						total = (fullDay + startWeek) % 7 == 0 ? (fullDay + startWeek) : fullDay + startWeek + (7 - (fullDay + startWeek) % 7), 
						lastMonthDay = new Date(year, month, 0).getDate(), 
						eleTemp = [];
					for(var i = 0; i < total; i++) {
						if(i < startWeek) {
							eleTemp.push('<li class="other-month"><span class="dayStyle">' + (lastMonthDay - startWeek + 1 + i) + '</span></li>')
						} else if(i < (startWeek + fullDay)) {
							var nowDate = formartDate(year, month + 1, (i + 1 - startWeek), '-');
							var addClass = '';
							selectedDate == nowDate && (addClass = 'selected-style');
							formartDate(currentYear, currentMonth + 1, currentDay, '-') == nowDate && (addClass = 'today-flag');
							let ttt = false;
							for(let nn = 0; nn < res.data.length; nn++) {
								let daynno = (res.data[nn].signDate).substring(8, 10)
								daynno = (daynno.toString())[1] ? daynno : '0' + daynno;
								
								if(daynno == (i + 1 - startWeek)) {
									ttt = true
								}
							}
							if(ttt == true) {
								eleTemp.push('<li class="current-month current-active" ><span title=' + nowDate + ' class="currentDate dayStyle ' + addClass + '">' + (i + 1 - startWeek) + '</span></li>')
							} else {
								eleTemp.push('<li class="current-month" ><span title=' + nowDate + ' class="currentDate dayStyle ' + addClass + '">' + (i + 1 - startWeek) + '</span></li>')
							}
						} else {
							eleTemp.push('<li class="other-month"><span class="dayStyle">' + (i + 1 - (startWeek + fullDay)) + '</span></li>')
						}
					}
					ela.querySelector('.schedule-bd').innerHTML = eleTemp.join('');
					ela.querySelector('.today').innerHTML = formartDate(year, month + 1, day, '-');
				},
				error: function(jqXHR) {

				}
			})

		};
		this.nextMonthFun = function() {
				if(month + 1 > 11) {
					year += 1;
					month = 0;
				} else {
					month += 1;
				}
				render();
				opt.nextMonthCb && opt.nextMonthCb(year, month + 1, day);
			},
			this.nextYearFun = function() {
				year += 1;
				render();
				opt.nextYeayCb && opt.nextYeayCb(year, month + 1, day);
			},
			this.prevMonthFun = function() {
				if(month - 1 < 0) {
					year -= 1;
					month = 11;
				} else {
					month -= 1;
				}
				render();
				opt.prevMonthCb && opt.prevMonthCb(year, month + 1, day);
			},
			this.prevYearFun = function() {
				year -= 1;
				render();
				opt.prevYearCb && opt.prevYearCb(year, month + 1, day);
			}
		init();
	}
	_global = (function() {
		return this || (0, eval)('this')
	}());
	if(typeof module !== 'undefined' && module.exports) {
		module.exports = Schedule;
	} else if(typeof define === "function" && define.amd) {
		define(function() {
			return Schedule;
		})
	} else {
		!('Schedule' in _global) && (_global.Schedule = Schedule);
	}

}());