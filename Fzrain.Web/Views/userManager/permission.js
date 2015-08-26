﻿(function () {
    materialAdmin.controller('permissionController', [
        'abp.services.app.permissionInfo', 'ngTableParams', 'notifyService',
        function (permissionService, ngTableParams, notifyService) {
            var vm = this;
           
            vm.tableBasic = new ngTableParams({
                page: 1,
                count: 10
            }, {
                total: 0,
                getData: function ($defer, params) {    
                    permissionService.getPermissions({
                        skipCount: (params.page() - 1) * params.count(), maxResultCount: params.count()
                    }).success(function (data) {
                        params.total(data.totalCount);
                        $defer.resolve(data.items);
                    });

                }
            });
            vm.permission = {};
            vm.add = function () {
                vm.permission = {};
                vm.permission.parentName = "无";
                permissionService.getPermissionNames().success(function (data) {
                    vm.parentPermissions = data;
                });
            }
            vm.edit = function (id) {
                permissionService.getById({ id: id }).success(function (data) {
                    vm.permission = data;
                });
                permissionService.getPermissionNames().success(function (data) {
                    vm.parentPermissions = data;
                });
            }
            vm.save = function () {
                permissionService.addOrUpdate(vm.permission).success(function () {
                    notifyService.notify('保存成功！', 'success');
                    $("#modalPermissionEdit").modal("hide");
                });
            }
           
        }
    ]);
})();