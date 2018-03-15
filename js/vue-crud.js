/**
 * VUEJS CRUD DEMO APPLICATION
 *
 * @author Nguyen Nhu Tuan <tuanquynh0508@gmail.com>
 * @home http://tnqsoft.com
 * @version 1.0.0
 */
window.app = new Vue({
    el: "#app",
    data: {
        items: [],
        loading: false,
        state: 'list',
        error: null,
        currentItem: null,
        search: '',
        form: {
            id: 0,
            name: ''
        }
    },
    methods: {
        onSubmit (evt) {
            evt.preventDefault();
            var _this = this;
            if (this.state == 'add') {
                jQuery.ajax({
                    type: "POST",
                    url: 'api/demo-add.php',
                    data: {
                        name: _this.form.name
                    },
                    dataType: "json",
                    cache: false,
                    beforeSend: function() {
                        _this.loading = true;
                    },
                    success: function(data) {
                        _this.items.push({
                            id: data.id,
                            name: data.name
                        });
                        _this.cancelForm();
                    },
                    error: function() {
                        _this.error = 'An error occurred';
                    },
                    complete: function() {
                        _this.loading = false;
                    },
                });
            } else if (this.state == 'edit') {
                jQuery.ajax({
                    type: "PUT",
                    contentType: 'application/json',
                    url: 'api/demo-edit.php',
                    data: JSON.stringify({
                        id: _this.form.id,
                        name: _this.form.name
                    }),
                    dataType: "json",
                    cache: false,
                    beforeSend: function() {
                        _this.loading = true;
                    },
                    success: function(data) {
                        let key = _this.findItemById(data.id);
                        _this.items[key].name =  data.name;
                        _this.cancelForm();
                    },
                    error: function() {
                        _this.error = 'An error occurred';
                    },
                    complete: function() {
                        _this.loading = false;
                    },
                });
            }
        },
        cancelForm: function() {
            this.form.name = '';
            this.state = 'list';
        },
        findItemById: function(id) {
            for (var key = 0; key < this.items.length; key++) {
                if (this.items[key].id == id) {
                    return key;
                }
            }
        },
        addItem: function() {
            this.state = 'add';
        },
        editItem: function(item) {
            this.form.id = item.id;
            this.form.name = item.name;
            this.state = 'edit';
        },
        deleteItem: function() {
            var _this = this;
            jQuery.ajax({
                type: "DELETE",
                contentType: 'application/json',
                url: 'api/demo-delete.php?id='+_this.currentItem.id,
                data: {},
                dataType: "json",
                cache: false,
                beforeSend: function() {
                    _this.loading = true;
                },
                success: function(data) {
                    let key = _this.findItemById(_this.currentItem.id);
                    _this.items.splice(key, 1);
                    _this.currentItem = null;
                    _this.$refs.deleteModalRef.hide();
                },
                error: function() {
                    _this.error = 'An error occurred';
                },
                complete: function() {
                    _this.loading = false;
                },
            });
        },
        deleteConfirm: function(item) {
            this.currentItem = item;
            this.$refs.deleteModalRef.show();
            // this.items.splice(this.findItemById(id), 1);
        },
        deleteCancel: function(id) {
            this.$refs.deleteModalRef.hide();
        }
    },
    computed: {
        filteredItems:function()
        {
            var self=this;
            return this.items.filter(function(item){return item.name.toLowerCase().indexOf(self.search.toLowerCase())>=0;});
        }
    },
    created: function() {
        var _this = this;
        jQuery.ajax({
            type: "GET",
            url: 'api/demo-list.php',
            data: {},
            dataType: "json",
            cache: false,
            beforeSend: function() {
                _this.loading = true;
            },
            success: function(data) {
                _this.items = data;
            },
            error: function() {
                _this.error = 'An error occurred';
            },
            complete: function() {
                _this.loading = false;
            },
        });
    }
})
