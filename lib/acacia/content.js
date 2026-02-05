export const Content = {
    LoadJSON: async (path) => {
        return new Promise((resolve, reject) => {
            fetch(path)
                .then(response => response.json()).then(data => {
                    resolve(data);
                }).catch(() => {
                    reject(null);
                });
        });
    },
    LoadText: async (path) => {
        return new Promise((resolve, reject) => {
            fetch(path)
                .then(response => response.text()).then(data => {
                    resolve(data);
                }).catch(() => {
                    reject(null);
                });
        });
    },
    LoadBinary: async (path) => {
        return new Promise((resolve, reject) => {
            fetch(path)
                .then(response => response.blob()).then(data => {
                    resolve(data);
                }).catch(() => {
                    reject(null);
                });
        });
    },
    ImageHandler: {
        /**@description Resizes an image and returns the base64 data src*/
        ResizeImg: (imageElement, w, h) => {
            let newImg = new Image();
            let canvas = document.createElement("canvas");
            canvas.width = w;
            canvas.height = h;
            let ctx = canvas.getContext("2d");
            ctx.drawImage(imageElement, 0, 0, w, h);
            newImg.src = canvas.toDataURL();
            return newImg;
        }
    },
    TextHandler: {
        /** @description Verificar o tamanho dos dados, em MB */
        Size: async (data) => {
            let bytes;
            let encoder = new TextEncoder();

            if (typeof (data) == "string") {
                bytes = encoder.encode(data).length;
            } else if (typeof (data) == "number" || typeof (data) == "bigint" || typeof (data) == "boolean") {
                bytes = encoder.encode(JSON.stringify([data])).length;
            } else if (typeof (data) == "object") {
                bytes = encoder.encode(JSON.stringify(data)).length;
            } else {
                return -1;
            }
            return (bytes / (1024 * 1024));
        },
        CurrencyConverter: (txt, format) => {
            let value = txt.replace(/\D/g, '');
            if (value.length === 0) {
                value = '';
                return;
            }
            value = (parseInt(value, 10) / 100).toFixed(2);
            value = value.replace('.', ',');
            if (format) return `R$: ${value}`;
            return value;
        },
        MarkdownParser: (markdown) => {
            // Code blocks
            markdown = markdown.replace(/```([^`]*)```/g, '<pre><code>$1</code></pre>');
            // Inline codes
            markdown = markdown.replace(/`([^`]*)`/g, '<code>$1</code>');
            // Titles
            markdown = markdown.replace(/^#{6}\s*(.*)/gm, '<h6>$1</h6>');
            markdown = markdown.replace(/^#{5}\s*(.*)/gm, '<h5>$1</h5>');
            markdown = markdown.replace(/^#{4}\s*(.*)/gm, '<h4>$1</h4>');
            markdown = markdown.replace(/^#{3}\s*(.*)/gm, '<h3>$1</h3>');
            markdown = markdown.replace(/^#{2}\s*(.*)/gm, '<h2>$1</h2>');
            markdown = markdown.replace(/^#\s*(.*)/gm, '<h1>$1</h1>');
            // Bold, italic, underline
            markdown = markdown.replace(/\*\*\*(.*?)\*\*\*/g, '<b><i>$1</i></b>'); // Bold italic
            markdown = markdown.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>'); // Bold
            markdown = markdown.replace(/\*(.*?)\*/g, '<i>$1</i>'); // Italic
            markdown = markdown.replace(/__(.*?)__/g, '<u>$1</u>'); // Underline
            // Paragraphs
            markdown = markdown.replace(/^\s*(.+)\s*$/gm, '<p>$1</p>');
            // Ordered lists
            markdown = markdown.replace(/^\d+\.\s*(.*)/gm, '<li>$1</li>');
            markdown = markdown.replace(/(<li>.*<\/li>)/g, '<ol>$1</ol>');
            // Unordered lists
            markdown = markdown.replace(/^\*\s+(.*)/gm, '<li>$1</li>');
            markdown = markdown.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');

            // Links
            markdown = markdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
            // Images
            markdown = markdown.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');
            // Videos
            markdown = markdown.replace(/\[video\]\(([^)]+)\)/g, '<iframe src="$1" frameborder="0" allowfullscreen></iframe>');

            return markdown;
        }
    },
    HTMLHandler: {},
    AudioHandler: {},
    BufferHandler: {},
    DataTransferHandler: {},
    IndexedDB: {
        /** @description Create tables if not exists */
        New: (dbName, tableName) => {
            return new Promise((resolve, reject) => {
                const request = indexedDB.open(dbName, 1);
                request.onerror = (e) => reject(e.target.error);
                request.onupgradeneeded = e => {
                    const db = e.target.result;
                    if (!db.objectStoreNames.contains(tableName)) {
                        db.createObjectStore(tableName, { keyPath: "id" });
                    }
                };
                request.onsuccess = () => resolve();
            });
        },

        /** @description Check if a record exists */
        Check: async (dbName, tableName, id) => {
            return new Promise((resolve, reject) => {
                const request = indexedDB.open(dbName);

                request.onupgradeneeded = e => {
                    const db = e.target.result;
                    if (!db.objectStoreNames.contains(tableName)) {
                        reject(`Database error: ${e.target.error}`);
                    }
                };

                request.onerror = (event) => {
                    reject(`Database error: ${event.target.error}`);
                };

                request.onsuccess = (event) => {
                    const db = event.target.result;
                    if (!db.objectStoreNames.contains(tableName)) {
                        reject(`Tabela ${tableName} não existe.`);
                        return;
                    }
                    const transaction = db.transaction(tableName, "readonly");
                    const store = transaction.objectStore(tableName);
                    const query = store.get(id);

                    query.onerror = (event) => {
                        reject(`Request error: ${event.target.error}`);
                    };

                    query.onsuccess = (event) => {
                        resolve(!!event.target.result);
                    };
                };
            });
        },

        /** @description Record or update an object */
        Write: async (dbName, tableName, tableData, objId) => {
            return new Promise(async (resolve, reject) => {
                await Content.IndexedDB.New(dbName, tableName);
                const request = indexedDB.open(dbName, 1);
                request.onerror = e => {
                    reject(`Request error: ${e.target.error}`);
                };
                request.onsuccess = e => {
                    const db = e.target.result;
                    const store = db.transaction(tableName, "readwrite").objectStore(tableName);
                    const query = store.put({ id: objId, data: tableData });
                    query.onerror = e => {
                        reject(`Request error: ${e.target.error}`);
                    }
                    query.onsuccess = e => {
                        resolve(true);
                    }
                };
            });
        },

        /** @description Retrieve an object from the table */
        Read: async (dbName, tableName, id) => {
            return new Promise(async (resolve, reject) => {
                await Content.IndexedDB.New(dbName, tableName);
                const request = indexedDB.open(dbName, 1);

                request.onerror = e => {
                    reject(`Database error: ${e.target.error}`);
                }

                request.onsuccess = e => {
                    const db = e.target.result;
                    // Inserir dados:
                    const store = db.transaction(tableName, "readonly").objectStore(tableName);

                    const query = store.get(id);
                    query.onerror = (event) => {
                        reject(`Request error: ${event.target.error}`);
                    };
                    query.onsuccess = (event) => {
                        const result = event.target.result
                        resolve(result.data);
                    };
                };
            });
        },

        /** @description Delete an object from the table */
        Remove: async (dbName, tableName, id) => {
            return new Promise(async (resolve, reject) => {
                await Content.IndexedDB.New(dbName, tableName);
                const request = indexedDB.open(dbName);

                request.onerror = e => {
                    reject(`Database error: ${e.target.error}`);
                };

                request.onsuccess = e => {
                    const db = e.target.result;
                    const store = db.transaction(tableName, 'readwrite').objectStore(tableName);
                    const query = store.delete(id);

                    query.onerror = e => {
                        reject(`Request error: ${e.target.error}`);
                    };

                    query.onsuccess = e => {
                        resolve(true);
                    };
                };
            });
        }
    },
    Cache: {
        SaveData: (url, data, cacheName) => {
            caches.open(cacheName).then(cache => {
                const response = new Response(JSON.stringify(data), {
                    headers: { 'Content-Type': 'application/json' }
                });
                cache.put(url, response);
            });
        },
        GetData: async (url, cacheName) => {
            const cache = await caches.open(cacheName);
            const response = await cache.match(url);
            if (response) return response.json();
            return null;
        },
    },
    HTTP: {
        Get: async (path) => {
            let res = await fetch(path, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            return await res.json();
        },
        Post: async (path, _body) => {
            let res = await fetch(path, {
                method: "POST",
                body: JSON.stringify(_body),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            return await res.json();
        },
    },
    Social: {
        MyUserData: { Id: "", Username: "", Name: "", Description: "", Thumbnail: "", Genre: "", Email: "", State: {} },
        UserData: class { Id = ""; Username = ""; Name = ""; Description = ""; Thumbnail = ""; State = {} },
        RoomData: class { Id = ""; Username = ""; Name = ""; Description = ""; Thumbnail = ""; State = {} },
    }
}
