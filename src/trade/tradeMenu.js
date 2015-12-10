﻿/**
 * Created by amin on October 30, 2015.
 */
define(["jquery", "lodash", "websockets/binary_websockets", "common/menu", "jquery-growl"], function ($, lodash, liveapi, menu) {

    var show_error = function (err) { $.growl.error({ message: err.message }); console.error(err); };
    function refresh_active_symbols() {
        liveapi
            .send({ active_symbols: 'brief' })
            .then(function (data) {
              /* clean up the data! */
              var markets = _(data.active_symbols).groupBy('market').map(function(symbols){
                  var sym = _.first(symbols);
                  market = { name: sym.market, display_name: sym.market_display_name};
                  market.submarkets = _(symbols).groupBy('submarket').map(function(symbols){
                    var sym = _.first(symbols);
                    var submarket = { name: sym.submarket, display_name: sym.submarket_display_name };
                    submarket.instruments = _.map(symbols, function(sym){
                        return  {
                          symbol: sym.symbol,
                          display_name: sym.display_name,
                          is_disabled: sym.is_trading_suspended || !sym.exchange_is_open
                        };
                      });
                    submarket.is_disabled = _.all(submarket.instruments, 'is_disabled');
                    return submarket;
                  }).run();
                  market.is_disabled = _.all(market.submarkets, 'is_disabled');
                  return market;
              }).run();

              var root = $("<ul>").appendTo($("#nav-menu").find(".trade")); /* add to trade menu */
              menu.sortMenu(markets);
              menu.refreshMenu(root, markets, function (li) {
                  var data = li.data();
                  liveapi
                    .send({ contracts_for: data.symbol })
                    .then(function (res) {
                        require(['trade/tradeDialog'], function (tradeDialog) {
                            tradeDialog.init(data, res.contracts_for);
                        });
                    }).catch(show_error);
              });
            })
            .catch(show_error);
    }

    function init() {
        require(['trade/tradeDialog']); // Trigger loading of tradeDialog
        setInterval(refresh_active_symbols, 60*1000); // refersh active symbols every minute
    }

    return {
        init: init
    };
});
