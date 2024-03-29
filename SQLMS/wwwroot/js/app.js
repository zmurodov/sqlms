$(document).ready(function () {

    var currentDatabase = "";
    var tabCount = 0;

    $("#side-menu").empty()

    var codeMirrors = {}

    $("#lock-wait").css('display', 'block')

    $.ajax({
        type: "post",
        url: "/test",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            Toastify({
                title: "Connection Info",
                text: data.message,
                backgroundColor: "#1ab394",
                position: "center",
                close: !0,
                className: "toastr-cl"
            }).showToast()
            loadPage();
            hideConnectionModal()
            $("#table").bootstrapTable("destroy")
            $("#table>thead>tr").empty()
            $("#lock-wait").css('display', 'none')
        },
        error: function (xhr, textStatus, error) {
            showConnectionModal()
            $("#lock-wait").css('display', 'none')
        }
    })


    function createCodeMirror(id) {

        let a = CodeMirror.fromTextArea($(`#${id}`)[0], {
            theme: 'eclipse',
            mode: 'text/x-mssql',
            scrollbarStyle: 'simple',
            lineNumbers: !0,
            extraKeys: {
                'Ctrl-Space': 'autocomplete',
                'Alt-Space': 'autocomplete',
            },
        });

        a.focus();
        CodeMirror.commands.autocomplete = function (e) {
            CodeMirror.showHint(e, CodeMirror.hint.sql, {
                completeSingle: !1
                //,
                //         tables: SQmodSDB.getmarr_shema_hint().tables,
                //         column: SQmodSDB.getmarr_shema_hint().column,
            });
        };
        a.on('keyup', function (e, n) {
            let r = n.keyCode || n.which,
                a = e.getDoc().getCursor(),
                c = e.getTokenAt(a),
                i = !c || !c.type || 'string' != c.type;
            if (
                (!e.state.completionActive &&
                !n.ctrlKey &&
                ((r >= 65 && r <= 90) || 190 == r) &&
                i &&
                CodeMirror.commands.autocomplete(e, null, {
                    completeSingle: !1,
                }),
                null === a.sticky)
            ) {
                const n = e.getLine(a.line),
                    r = (function (e) {
                        let n = -1;
                        return (
                            t.forEach(function (t, o) {
                                0 ===
                                e
                                    .trimLeft()
                                    .toLocaleLowerCase()
                                    .indexOf(t + ' ') && (n = o);
                            }),
                                n
                        );
                    })(n);
                r > -1 && o(e, a, r, n);
            }
        });

        codeMirrors[id] = a;
    }



    function createTab() {
        tabCount += 1;
        var tabId = `mtab-${tabCount}`;
        var boxId = `box-${tabCount}`;
        var editorId = `editor-${tabCount}`;
        var tab = `<li class="" style="height: auto;">
                                            <a class="active" id="${tabId}" data-box-id="${boxId}" style=""><i class="fa fa-server"></i>mssql.${tabCount}</a><span><i class="fa fa-times-circle"></i></span>
                                        </li>`;

        var box = `<div id="${boxId}" class="tab-pane active">
                                    <textarea id="${editorId}" class="text-sql" style="display: none;"></textarea>
                                </div>`

        $("#edit-tab-list").append(tab)
        $("#edit-box").append(box)
        createCodeMirror(editorId)

        $("#edit-tab-list>li>a").each(function () {
            if ($(this).attr("id") != tabId) {
                $(this).removeClass("active")
            }
        })

        $("#edit-box>div.tab-pane").each(function () {
            if ($(this).attr("id") != boxId) {
                $(this).removeClass("active")
            }
        })
    }

    $("body").on("click", "#edit-tab-list>li>a", function (e) {
        var a = $(this)
        setTabActive(a)
    })

    $("body").on("click", "#da-modal a", function () {
        currentDatabase = $(this).text()
        $("#tm-btn-file").text(currentDatabase)

        $("#da-modal").css("display", "none")
    })

    function setTabActive(a) {
        var boxId = a.attr("data-box-id")

        a.addClass("active");
        $(`#edit-box>div#${boxId}`).addClass("active")

        $("#edit-tab-list>li>a").each(function () {
            if ($(this)[0] !== a[0]) {
                $(this).removeClass("active")
            }
        })

        $("#edit-box>div.tab-pane").each(function () {
            if ($(this).attr("id") != boxId) {
                $(this).removeClass("active")
            }
        })
    }

    $("body").on("click", "i.fa.fa-times-circle", function (e) {
        var li = $(this).parents("#edit-tab-list>li")
        var boxId = li.children("a").attr("data-box-id")
        $(`#${boxId}`).remove()

        console.log(boxId)
        li.remove()

        tabCount -= 1;

        setTabActive($("#edit-tab-list>li>a#mtab-0"))
    })

    $("body").on("click", "ul.nav.navd.nav-second-level>li>a.menu-group", function (e) {
        e.preventDefault()
        const li = $(this).parent()

        if (li.hasClass("active")) {
            hideDbItem(li)
        } else {
            showDbItem2(li)
        }

    })

    $("body").on("click", "#side-menu>li>a", function (e) {
        e.preventDefault();
        const li = $(this).parent();

        if (li.hasClass("active")) {
            hideDbItem(li)
        } else {
            showDbItem(li)
        }
    })


    function showDbItem2(li) {
        const a = li.children("a");
        const ul = li.children("ul");
        li.addClass("active")
        a.attr("aria-expanded", "true")
        ul.removeClass("collapse")
        ul.removeClass("in");
        ul.addClass("collapsing");
        ul.addClass("collapse")
        ul.addClass("in")
        ul.css("height", ul[0].scrollHeight + "px")
        ul.removeClass("collapsing")
        ul.css("height", "")
    }

    function showDbItem(li) {
        const a = li.children("a");
        const ul = li.children("ul");
        li.addClass("active")
        a.attr("aria-expanded", "true")
        ul.removeClass("collapse")
        ul.removeClass("in");
        ul.addClass("collapsing");
        $("#side-menu>li").each(function () {
            if ($(this)[0] !== li[0]) {
                hideDbItem($(this))
            }
        })
        ul.addClass("collapse")
        ul.addClass("in")
        ul.css("height", ul[0].scrollHeight + "px")
        ul.removeClass("collapsing")
        ul.css("height", "")
    }

    function hideDbItem(li) {
        const a = li.children("a");
        const ul = li.children("ul");

        if (!ul.hasClass("in")) return;

        li.removeClass("active")
        a.attr("aria-expanded", "false")
        ul.addClass("collapse")
        ul.addClass("in");
        ul.removeClass("collapsing");
        ul.removeClass("in")
        ul.css("height", "0px;")
    }

    $("#mt-btn-mod").unbind("click").on("click", function () {
        showConnectionModal()
    });

    $("#ce-add").unbind("click").on("click", function () {
        createTab();
    })



    $("#connectForm").on("submit", function (e) {
        e.preventDefault()

        $("#lock-wait").css('display', 'block')

        var servername = $("#ConnServerName").val()
        var port = $("#ConnPort").val()
        var username = $("#ConnUsername").val()
        var password = $("#ConnPassword").val()
        
        var body = {
            serverName: servername,
            port: port == "" ? null : port,
            username: username,
            password: password
        }
        $.ajax({
            type: "post",
            url: "/connect",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(body),
            success: function (data) {
                if (data.success) {
                    Toastify({
                        title: "Connection Info",
                        text: data.message,
                        backgroundColor: "#1ab394",
                        position: "center",
                        close: !0,
                        className: "toastr-cl"
                    }).showToast()
                    loadPage();
                    hideConnectionModal()
                    $("#table").bootstrapTable("destroy")
                    $("#table>thead>tr").empty()
                    $("#lock-wait").css('display', 'none')
                    $("#tm-btn-file").text("Selected Database")
                } else {
                    Toastify({
                        title: "Connection Info",
                        text: data.message,
                        backgroundColor: "#ed5565",
                        position: "center",
                        close: !0,
                        className: "toastr-cl"
                    }).showToast()
                    $("#lock-wait").css('display', 'none')
                }
            },
            error: function (xhr, textStatus, error) {
                $("#lock-wait").css('display', 'none')
                showErrorToast(xhr.responseJSON["error"])
            }
        })
    })
    $("#tm-btn-file").on("click", function () {
        var dbs = $("#da-modal")
        if (dbs.css("display") == "block") {
            dbs.hide()
        } else {
            dbs.show()
        }
    })

    function loadPage() {
        loadDbs();
        // load
    }

    function loadDbs() {
        $.ajax({
            ype: "get",
            url: "/get-databases",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                console.log(data)
                if (data != null && data.databases != null) dbUIRefresh(data.databases);
            },
            error: function (xhr, textStatus, error) {
                showErrorToast(xhr.responseJSON["error"])
            }
        })
    }

    function dbUIRefresh(databases) {
        var dbsUl = $("#da-modal>ul");
        dbsUl.empty();
        for (var i in databases) {
            dbsUl.append(`<li><a class="" tabindex="-1"><i class="fa fa-database" style="margin-right:5px"></i>${databases[i].name}</a></li>`)
        }
        var sideMenu = $("#side-menu");

        sideMenu.empty()

        //$("#table").bootstrapTable("destroy")


        for (var d in databases) {
            var database = databases[d]
            var tableItems = `<li class="title" style="padding-top: 7px; padding-bottom: 3px;"><div class="name" style="padding-left: 37px;">Table</div></li>`

            for (var t in databases[d].tables) {
                var table = databases[d].tables[t]

                var columnItems = `<li style="padding-top: 5px;"><a class="menu-group-sub"> <b>Column</b> </a></li>`

                for (var c in table.columns) {
                    var column = table.columns[c]
                    columnItems += `<li>
<a class="menu-group-sub">
<div class="left-menu-item-f" irem="4" id="menu-el-rem-sqlite4"> <i class="fa fa-columns"></i>${column.name} <small class="left-menu-item-column-type">
${column.type}
            ${column.maxLength != "" || column.maxLength != "-1" ? '(' + column.maxLength + ')' : ''}
</small> </div>
</a>
</li>`
                }
                tableItems += `<li class="">
                                            <a class="menu-group" aria-expanded="false"><div class="left-menu-item" irem="1" id="menu-el-rem-sqlite1"> <i class="fa fa-table" style="margin-right: 10px;"></i>${table.schema}.${table.name} </div> <span class="fa arrow"></span> </a><ul class="nav nav-third-level collapse" style=""> ${columnItems} </ul></li>`
            }

            sideMenu.append(`<li class="">
                                                                            <a id="m-sqlite" aria-expanded="false"> <i class="fa fa-database" aria-hidden="true">
                                                                                              </i> <span class="nav-label">${database.name}</span> <span class="fa arrow">
                                                                                              </span> </a>
                                                                            <ul class="nav nav-second-level collapse" m-type="sqlite" style="height: 0px;">
                                                                              <li id="menu-left-db-sqlite">
                                                                                <ul class="nav navd nav-second-level ">
                                                                                  ${tableItems}
                                                                                </ul>
                                                                              </li>
                                                                            </ul>
                                                                          </li>`)

        }
    }

    $("#mt-btn-run").on("click", function () {

        var a = $("#edit-tab-list>li>a.active").first()
        var boxId = a.attr("data-box-id")

        var key = $(`#edit-box>div#${boxId}>textarea`).attr("id")

        var codeMirror = codeMirrors[key]

        var text = codeMirror.getValue()

        if (text == null || text == "" || currentDatabase == null || currentDatabase == "") return;

        var body = {
            query: text,
            databaseName: currentDatabase
        }

        $("#lock-wait").css('display', 'block')

        $.ajax({
            type: "post",
            url: "/run-query",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(body),
            success: function (data) {
                if (data) {
                    console.log(data)
                    Toastify({
                        title: "Connection Info",
                        text: "Query executed successfully.",
                        backgroundColor: "#1ab394",
                        position: "center",
                        close: !0,
                        className: "toastr-cl"
                    }).showToast()
                    $("#table").bootstrapTable("destroy")
                    $("#table>thead>tr").empty()
                    loadTable(data)
                    loadDbs()

                    $("#lock-wait").css('display', 'none')
                } else {
                    console.log(data)
                    $("#lock-wait").css('display', 'none')

                }
            },
            error: function (xhr, textStatus, error) {
                $("#lock-wait").css('display', 'none')
                var message = xhr.responseJSON["error"]
                showErrorToast(message)
                updateStatistics(message, "", "")
            }
        })
    })

    function loadTable(data) {

        var tr = $("#table>thead>tr")
        tr.empty()

        for (var i in data.names) {
            var name = data.names[i]
            var th = `<th data-field="${name}" data-sortable="false">${name}</th>`

            tr.append(th)
        }

        $("#table>tbody").remove()

        $(function () {

            $('#table').bootstrapTable("destroy")
            $('#table').bootstrapTable({
                data: data.result,
                resizable: true,
                stickyHeader: true,
                stickyHeaderOffsetLeft: '3em',
                stickyHeaderOffsetRight: '3em',
                theadClasses: "thead-light",
                show_columns: true,
            })
        })

        updateStatistics(data.stat["statMessage"],
            data.stat["statTime"],
            data.stat["statRows"])
    }


    function updateStatistics(message, time, rows) {
        $("#stat_message").text(message)
        $("#stat_time").text(time)
        $("#stat_rows").text(rows)
    }


    function showErrorToast(text) {
        Toastify({
            text: text,
            backgroundColor: "#ed5565",
            position: "center",
            close: !0,
            className: "toastr-cl"
        }).showToast()
    }

    function showConnectionModal() {
        $("#dl-modal2").show()
        $("#dh-modal2").show()
        $("#mask").show()
    }

    function hideConnectionModal() {
        $("#dl-modal2").hide()
        $("#dh-modal2").hide()
        $("#mask").hide()
    }


    createCodeMirror("editor-0")


    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
});