const asyncHooks = require('async_hooks');
const fs = require("fs");

const store = new Map();

const asyncHook = asyncHooks.createHook({
    init: (asyncId, _, triggerAsyncId) => {
        if (store.has(triggerAsyncId)) {
            store.set(asyncId, store.get(triggerAsyncId));
        }
    },
    destroy: (asyncId) => {
        if (store.has(asyncId)) {
            store.delete(asyncId);
        }
    }
});

asyncHook.enable();

const createRequestContext = function (requestId) {
    store.set(asyncHooks.executionAsyncId(), requestId);
    return requestId;
};

const getRequestContext = function () {
    return store.get(asyncHooks.executionAsyncId());
};

module.exports = { createRequestContext, getRequestContext };