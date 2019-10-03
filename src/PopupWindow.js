import { toParams, toQuery } from './utils';

class PopupWindow {
    constructor(responseType, id, url, options = {}) {
        this.responseType = responseType;
        this.id = id;
        this.url = url;
        this.options = options;
    }

    open() {
        const { url, id, options } = this;

        this.window = window.open(url, id, toQuery(options, ','));
    }

    close() {
        this.cancel();
        this.window.close();
    }

    poll() {
        this.promise = new Promise((resolve, reject) => {
            this._iid = window.setInterval(() => {
                try {
                    const popup = this.window;

                    if (!popup || popup.closed !== false) {
                        this.close();

                        reject(new Error('The popup was closed'));

                        return;
                    }

                    if (popup.location.href === this.url || popup.location.pathname === 'blank') {
                        return;
                    }


                    let params

                    if (this.responseType === "token") {
                        params = toParams(popup.location.hash.replace(/^#/, ''));
                    } else if (this.responseType === "code") {
                        const urlParams = new URLSearchParams(popup.location.search);
                        const code = urlParams.get('code') ? urlParams.get('code') : "";
                        params = { code }
                    } else {
                        this.close();

                        reject(new Error('The popup was closed'));

                        return; 
                    }

                    resolve(params);

                    this.close();
                } catch (error) {
                    /*
                     * Ignore DOMException: Blocked a frame with origin from accessing a
                     * cross-origin frame.
                     */
                }
            }, 500);
        });
    }

    cancel() {
        if (this._iid) {
            window.clearInterval(this._iid);
            this._iid = null;
        }
    }

    then(...args) {
        return this.promise.then(...args);
    }

    catch(...args) {
        return this.promise.then(...args);
    }

    static open(...args) {
        const popup = new this(...args);

        popup.open();
        popup.poll();

        return popup;
    }
}

export default PopupWindow;