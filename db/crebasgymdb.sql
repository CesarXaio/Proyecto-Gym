/*==============================================================*/
/* DBMS name:      Microsoft SQL Server 2008                    */
/* Created on:     19/5/2023 20:56:44                           */
/*==============================================================*/


if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('AJUSTES_PRODUCTO') and o.name = 'FK_AJUSTES__REFERENCE_MOTIVOS_')
alter table AJUSTES_PRODUCTO
   drop constraint FK_AJUSTES__REFERENCE_MOTIVOS_
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('AJUSTE_DETALLES') and o.name = 'FK_AJUSTE_D_REFERENCE_AJUSTES_')
alter table AJUSTE_DETALLES
   drop constraint FK_AJUSTE_D_REFERENCE_AJUSTES_
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('AJUSTE_DETALLES') and o.name = 'FK_AJUSTE_D_REFERENCE_PRODUCTO')
alter table AJUSTE_DETALLES
   drop constraint FK_AJUSTE_D_REFERENCE_PRODUCTO
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('ARQUEOS_CAJA') and o.name = 'FK_ARQUEOS__REFERENCE_TURNOS')
alter table ARQUEOS_CAJA
   drop constraint FK_ARQUEOS__REFERENCE_TURNOS
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('ARQUEO_DETALLES') and o.name = 'FK_ARQUEO_D_REFERENCE_ARQUEOS_')
alter table ARQUEO_DETALLES
   drop constraint FK_ARQUEO_D_REFERENCE_ARQUEOS_
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('ARQUEO_DETALLES') and o.name = 'FK_ARQUEO_D_REFERENCE_MEDIOS_C')
alter table ARQUEO_DETALLES
   drop constraint FK_ARQUEO_D_REFERENCE_MEDIOS_C
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('COBRO_DETALLES') and o.name = 'FK_COBRO_DE_REFERENCE_MEDIOS_C')
alter table COBRO_DETALLES
   drop constraint FK_COBRO_DE_REFERENCE_MEDIOS_C
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('COBRO_DETALLES') and o.name = 'FK_COBRO_DE_REFERENCE_MOVIMIEN')
alter table COBRO_DETALLES
   drop constraint FK_COBRO_DE_REFERENCE_MOVIMIEN
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('COMPRAS') and o.name = 'FK_COMPRAS_REFERENCE_PROVEEDO')
alter table COMPRAS
   drop constraint FK_COMPRAS_REFERENCE_PROVEEDO
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('COMPRAS_DETALLES') and o.name = 'FK_COMPRAS__REFERENCE_PRODUCTO')
alter table COMPRAS_DETALLES
   drop constraint FK_COMPRAS__REFERENCE_PRODUCTO
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('COMPRAS_DETALLES') and o.name = 'FK_COMPRAS__REFERENCE_COMPRAS')
alter table COMPRAS_DETALLES
   drop constraint FK_COMPRAS__REFERENCE_COMPRAS
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('ENTRENADORES') and o.name = 'FK_ENTRENAD_REFERENCE_ESPECIAL')
alter table ENTRENADORES
   drop constraint FK_ENTRENAD_REFERENCE_ESPECIAL
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('FACTURA_DETALLES') and o.name = 'FK_FACTURA__REFERENCE_FACTURAS')
alter table FACTURA_DETALLES
   drop constraint FK_FACTURA__REFERENCE_FACTURAS
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('FACTURA_DETALLES') and o.name = 'FK_FACTURA__REFERENCE_MEMBRESI')
alter table FACTURA_DETALLES
   drop constraint FK_FACTURA__REFERENCE_MEMBRESI
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('FACTURA_DETALLES') and o.name = 'FK_FACTURA__REFERENCE_PRODUCTO')
alter table FACTURA_DETALLES
   drop constraint FK_FACTURA__REFERENCE_PRODUCTO
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('HORARIOS') and o.name = 'FK_HORARIOS_REFERENCE_ENTRENAD')
alter table HORARIOS
   drop constraint FK_HORARIOS_REFERENCE_ENTRENAD
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('MEDICIONES') and o.name = 'FK_MEDICION_REFERENCE_CLIENTES')
alter table MEDICIONES
   drop constraint FK_MEDICION_REFERENCE_CLIENTES
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('MEDICIONES') and o.name = 'FK_MEDICION_REFERENCE_ENTRENAD')
alter table MEDICIONES
   drop constraint FK_MEDICION_REFERENCE_ENTRENAD
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('MEDICION_DETALLES') and o.name = 'FK_MEDICION_REFERENCE_TIPOS_ME')
alter table MEDICION_DETALLES
   drop constraint FK_MEDICION_REFERENCE_TIPOS_ME
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('MEDICION_DETALLES') and o.name = 'FK_MEDICION_REFERENCE_MEDICION')
alter table MEDICION_DETALLES
   drop constraint FK_MEDICION_REFERENCE_MEDICION
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('MEMBRESIAS') and o.name = 'FK_MEMBRESI_REFERENCE_CLIENTES')
alter table MEMBRESIAS
   drop constraint FK_MEMBRESI_REFERENCE_CLIENTES
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('MEMBRESIAS') and o.name = 'FK_MEMBRESI_REFERENCE_MODALIDA')
alter table MEMBRESIAS
   drop constraint FK_MEMBRESI_REFERENCE_MODALIDA
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('MEMBRESIAS') and o.name = 'FK_MEMBRESI_REFERENCE_ESTADOS_')
alter table MEMBRESIAS
   drop constraint FK_MEMBRESI_REFERENCE_ESTADOS_
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('MEMBRESIAS') and o.name = 'FK_MEMBRESI_REFERENCE_ENTRENAD')
alter table MEMBRESIAS
   drop constraint FK_MEMBRESI_REFERENCE_ENTRENAD
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('MOVIMIENTOS') and o.name = 'FK_MOVIMIEN_REFERENCE_TURNOS')
alter table MOVIMIENTOS
   drop constraint FK_MOVIMIEN_REFERENCE_TURNOS
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('MOVIMIENTO_DETALLES') and o.name = 'FK_MOVIMIEN_REFERENCE_MOVIMIEN')
alter table MOVIMIENTO_DETALLES
   drop constraint FK_MOVIMIEN_REFERENCE_MOVIMIEN
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('MOVIMIENTO_DETALLES') and o.name = 'FK_MOVIMIEN_REFERENCE_FACTURAS')
alter table MOVIMIENTO_DETALLES
   drop constraint FK_MOVIMIEN_REFERENCE_FACTURAS
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TURNOS') and o.name = 'FK_TURNOS_REFERENCE_CAJEROS')
alter table TURNOS
   drop constraint FK_TURNOS_REFERENCE_CAJEROS
go

if exists (select 1
            from  sysobjects
           where  id = object_id('AJUSTES_PRODUCTO')
            and   type = 'U')
   drop table AJUSTES_PRODUCTO
go

if exists (select 1
            from  sysobjects
           where  id = object_id('AJUSTE_DETALLES')
            and   type = 'U')
   drop table AJUSTE_DETALLES
go

if exists (select 1
            from  sysobjects
           where  id = object_id('ARQUEOS_CAJA')
            and   type = 'U')
   drop table ARQUEOS_CAJA
go

if exists (select 1
            from  sysobjects
           where  id = object_id('ARQUEO_DETALLES')
            and   type = 'U')
   drop table ARQUEO_DETALLES
go

if exists (select 1
            from  sysobjects
           where  id = object_id('CAJEROS')
            and   type = 'U')
   drop table CAJEROS
go

if exists (select 1
            from  sysobjects
           where  id = object_id('CLIENTES')
            and   type = 'U')
   drop table CLIENTES
go

if exists (select 1
            from  sysobjects
           where  id = object_id('COBRO_DETALLES')
            and   type = 'U')
   drop table COBRO_DETALLES
go

if exists (select 1
            from  sysobjects
           where  id = object_id('COMPRAS')
            and   type = 'U')
   drop table COMPRAS
go

if exists (select 1
            from  sysobjects
           where  id = object_id('COMPRAS_DETALLES')
            and   type = 'U')
   drop table COMPRAS_DETALLES
go

if exists (select 1
            from  sysobjects
           where  id = object_id('ENTRENADORES')
            and   type = 'U')
   drop table ENTRENADORES
go

if exists (select 1
            from  sysobjects
           where  id = object_id('ESPECIALIDADES')
            and   type = 'U')
   drop table ESPECIALIDADES
go

if exists (select 1
            from  sysobjects
           where  id = object_id('ESTADOS_MEMBRESIA')
            and   type = 'U')
   drop table ESTADOS_MEMBRESIA
go

if exists (select 1
            from  sysobjects
           where  id = object_id('FACTURAS')
            and   type = 'U')
   drop table FACTURAS
go

if exists (select 1
            from  sysobjects
           where  id = object_id('FACTURA_DETALLES')
            and   type = 'U')
   drop table FACTURA_DETALLES
go

if exists (select 1
            from  sysobjects
           where  id = object_id('HORARIOS')
            and   type = 'U')
   drop table HORARIOS
go

if exists (select 1
            from  sysobjects
           where  id = object_id('MEDICIONES')
            and   type = 'U')
   drop table MEDICIONES
go

if exists (select 1
            from  sysobjects
           where  id = object_id('MEDICION_DETALLES')
            and   type = 'U')
   drop table MEDICION_DETALLES
go

if exists (select 1
            from  sysobjects
           where  id = object_id('MEDIOS_COBRO')
            and   type = 'U')
   drop table MEDIOS_COBRO
go

if exists (select 1
            from  sysobjects
           where  id = object_id('MEMBRESIAS')
            and   type = 'U')
   drop table MEMBRESIAS
go

if exists (select 1
            from  sysobjects
           where  id = object_id('MODALIDADES')
            and   type = 'U')
   drop table MODALIDADES
go

if exists (select 1
            from  sysobjects
           where  id = object_id('MOTIVOS_AJUSTE')
            and   type = 'U')
   drop table MOTIVOS_AJUSTE
go

if exists (select 1
            from  sysobjects
           where  id = object_id('MOVIMIENTOS')
            and   type = 'U')
   drop table MOVIMIENTOS
go

if exists (select 1
            from  sysobjects
           where  id = object_id('MOVIMIENTO_DETALLES')
            and   type = 'U')
   drop table MOVIMIENTO_DETALLES
go

if exists (select 1
            from  sysobjects
           where  id = object_id('PRODUCTOS')
            and   type = 'U')
   drop table PRODUCTOS
go

if exists (select 1
            from  sysobjects
           where  id = object_id('PROVEEDORES')
            and   type = 'U')
   drop table PROVEEDORES
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TIPOS_MEDIDA')
            and   type = 'U')
   drop table TIPOS_MEDIDA
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TURNOS')
            and   type = 'U')
   drop table TURNOS
go

/*==============================================================*/
/* Table: AJUSTES_PRODUCTO                                      */
/*==============================================================*/
create table AJUSTES_PRODUCTO (
   ID_AJUSTE_PRODUCTO   int                  identity,
   ID_MOTIVO_AJUSTE     int                  null,
   FECHA                datetime             null,
   constraint PK_AJUSTES_PRODUCTO primary key (ID_AJUSTE_PRODUCTO)
)
go

/*==============================================================*/
/* Table: AJUSTE_DETALLES                                       */
/*==============================================================*/
create table AJUSTE_DETALLES (
   ID_AJUSTE_DETALLE    int                  identity,
   ID_AJUSTE_PRODUCTO   int                  null,
   ID_PRODUCTO          int                  null,
   CANTIDAD             int                  null,
   constraint PK_AJUSTE_DETALLES primary key (ID_AJUSTE_DETALLE)
)
go

/*==============================================================*/
/* Table: ARQUEOS_CAJA                                          */
/*==============================================================*/
create table ARQUEOS_CAJA (
   ID_ARQUEO            int                  identity,
   ID_TURNO             int                  null,
   TOTAL                int                  null,
   HORA                 datetime             null,
   constraint PK_ARQUEOS_CAJA primary key (ID_ARQUEO)
)
go

/*==============================================================*/
/* Table: ARQUEO_DETALLES                                       */
/*==============================================================*/
create table ARQUEO_DETALLES (
   ID_ARQUEO_DETALLE    int                  identity,
   ID_ARQUEO            int                  null,
   ID_MEDIO_COBRO       int                  null,
   SUBTOTAL             int                  null,
   constraint PK_ARQUEO_DETALLES primary key (ID_ARQUEO_DETALLE)
)
go

/*==============================================================*/
/* Table: CAJEROS                                               */
/*==============================================================*/
create table CAJEROS (
   ID_CAJERO            int                  identity,
   NOMBRE               varchar(50)          null,
   EMAIL                varchar(50)          null,
   TELEFONO             varchar(50)          null,
   constraint PK_CAJEROS primary key (ID_CAJERO)
)
go

/*==============================================================*/
/* Table: CLIENTES                                              */
/*==============================================================*/
create table CLIENTES (
   ID_CLIENTE           int                  identity,
   NOMBRE               varchar(50)          null,
   CI                   varchar(50)          null,
   TELEFONO             varchar(50)          null,
   RUC                  varchar(50)          null,
   CORREO               varchar(50)          null,
   constraint PK_CLIENTES primary key (ID_CLIENTE)
)
go

/*==============================================================*/
/* Table: COBRO_DETALLES                                        */
/*==============================================================*/
create table COBRO_DETALLES (
   ID_COBRO_DETALLE     int                  identity,
   ID_MEDIO_COBRO       int                  null,
   ID_MOVIMIENTO_DETALLE int                  null,
   TOTAL_PAGO           int                  null,
   constraint PK_COBRO_DETALLES primary key (ID_COBRO_DETALLE)
)
go

/*==============================================================*/
/* Table: COMPRAS                                               */
/*==============================================================*/
create table COMPRAS (
   ID_COMPRA            int                  identity,
   ID_PROVEEDOR         int                  null,
   FECHA                datetime             null,
   TOTAL                int                  null,
   constraint PK_COMPRAS primary key (ID_COMPRA)
)
go

/*==============================================================*/
/* Table: COMPRAS_DETALLES                                      */
/*==============================================================*/
create table COMPRAS_DETALLES (
   ID_COMPRA_DETALLE    int                  identity,
   ID_PRODUCTO          int                  null,
   ID_COMPRA            int                  null,
   CANTIDAD             int                  null,
   PRECIO_UNITARIO      int                  null,
   SUBTOTAL             int                  null,
   constraint PK_COMPRAS_DETALLES primary key (ID_COMPRA_DETALLE)
)
go

/*==============================================================*/
/* Table: ENTRENADORES                                          */
/*==============================================================*/
create table ENTRENADORES (
   ID_ENTRENADOR        int                  identity,
   ID_ESPECIALIDAD      int                  null,
   NOMBRE               varchar(50)          null,
   CI                   varchar(50)          null,
   TELEFONO             varchar(50)          null,
   constraint PK_ENTRENADORES primary key (ID_ENTRENADOR)
)
go

/*==============================================================*/
/* Table: ESPECIALIDADES                                        */
/*==============================================================*/
create table ESPECIALIDADES (
   ID_ESPECIALIDAD      int                  identity,
   NOMBRE               varchar(50)          null,
   constraint PK_ESPECIALIDADES primary key (ID_ESPECIALIDAD)
)
go

/*==============================================================*/
/* Table: ESTADOS_MEMBRESIA                                     */
/*==============================================================*/
create table ESTADOS_MEMBRESIA (
   ID_ESTADO_MEMBRESIA  int                  identity,
   NOMBRE               varchar(50)          null,
   constraint PK_ESTADOS_MEMBRESIA primary key (ID_ESTADO_MEMBRESIA)
)
go

/*==============================================================*/
/* Table: FACTURAS                                              */
/*==============================================================*/
create table FACTURAS (
   ID_FACTURA           int                  identity,
   FECHA                datetime             null,
   TIMBRADO             varchar(50)          null,
   NUMERO               int                  null,
   TOTAL_PAGAR          int                  null,
   TOTAL_IVA            int                  null,
   constraint PK_FACTURAS primary key (ID_FACTURA)
)
go

/*==============================================================*/
/* Table: FACTURA_DETALLES                                      */
/*==============================================================*/
create table FACTURA_DETALLES (
   ID_FACTURA_DETALLE   int                  identity,
   ID_FACTURA           int                  null,
   ID_MEMBRESIA         int                  null,
   ID_PRODUCTO          int                  null,
   PRECIO_UNITARIO      int                  null,
   CANTIDAD             int                  null,
   DESCRIPCION          varchar(50)          null,
   VALOR_VENTA          int                  null,
   IVA_10               int                  null,
   IVA_5                int                  null,
   constraint PK_FACTURA_DETALLES primary key (ID_FACTURA_DETALLE)
)
go

/*==============================================================*/
/* Table: HORARIOS                                              */
/*==============================================================*/
create table HORARIOS (
   ID_HORARIO           int                  identity,
   ID_ENTRENADOR        int                  null,
   HORA_INICIO          datetime             null,
   HORA_FINAL           datetime             null,
   DIA                  int                  null,
   constraint PK_HORARIOS primary key (ID_HORARIO)
)
go

/*==============================================================*/
/* Table: MEDICIONES                                            */
/*==============================================================*/
create table MEDICIONES (
   ID_MEDICION          int                  identity,
   ID_CLIENTE           int                  null,
   ID_ENTRENADOR        int                  null,
   FECHA                datetime             null,
   constraint PK_MEDICIONES primary key (ID_MEDICION)
)
go

/*==============================================================*/
/* Table: MEDICION_DETALLES                                     */
/*==============================================================*/
create table MEDICION_DETALLES (
   ID_MEDICION_DETALLE  int                  identity,
   ID_TIPO_MEDIDA       int                  null,
   ID_MEDICION          int                  null,
   VALOR                float                null,
   constraint PK_MEDICION_DETALLES primary key (ID_MEDICION_DETALLE)
)
go

/*==============================================================*/
/* Table: MEDIOS_COBRO                                          */
/*==============================================================*/
create table MEDIOS_COBRO (
   ID_MEDIO_COBRO       int                  identity,
   NOMBRE               varchar(50)          null,
   constraint PK_MEDIOS_COBRO primary key (ID_MEDIO_COBRO)
)
go

/*==============================================================*/
/* Table: MEMBRESIAS                                            */
/*==============================================================*/
create table MEMBRESIAS (
   ID_MEMBRESIA         int                  identity,
   ID_CLIENTE           int                  null,
   ID_MODALIDAD         int                  null,
   ID_ESTADO_MEMBRESIA  int                  null,
   ID_ENTRENADOR        int                  null,
   FECHA_INICIO         datetime             null,
   FECHA_FINAL          datetime             null,
   constraint PK_MEMBRESIAS primary key (ID_MEMBRESIA)
)
go

/*==============================================================*/
/* Table: MODALIDADES                                           */
/*==============================================================*/
create table MODALIDADES (
   ID_MODALIDAD         int                  identity,
   NOMBRE               varchar(50)          null,
   PRECIO               int                  null,
   constraint PK_MODALIDADES primary key (ID_MODALIDAD)
)
go

/*==============================================================*/
/* Table: MOTIVOS_AJUSTE                                        */
/*==============================================================*/
create table MOTIVOS_AJUSTE (
   ID_MOTIVO_AJUSTE     int                  identity,
   DESCRIPCION          varchar(50)          null,
   TIPO_MOVIMIENTO      bit                  null,
   constraint PK_MOTIVOS_AJUSTE primary key (ID_MOTIVO_AJUSTE)
)
go

/*==============================================================*/
/* Table: MOVIMIENTOS                                           */
/*==============================================================*/
create table MOVIMIENTOS (
   ID_MOVIMIENTO        int                  identity,
   ID_TURNO             int                  null,
   FECHA                datetime             null,
   HORA                 datetime             null,
   TOTAL                int                  null,
   constraint PK_MOVIMIENTOS primary key (ID_MOVIMIENTO)
)
go

/*==============================================================*/
/* Table: MOVIMIENTO_DETALLES                                   */
/*==============================================================*/
create table MOVIMIENTO_DETALLES (
   ID_MOVIMIENTO_DETALLE int                  identity,
   ID_MOVIMIENTO        int                  null,
   ID_FACTURA           int                  null,
   SUBTOTAL             int                  null,
   TIPO                 bit                  null,
   constraint PK_MOVIMIENTO_DETALLES primary key (ID_MOVIMIENTO_DETALLE)
)
go

/*==============================================================*/
/* Table: PRODUCTOS                                             */
/*==============================================================*/
create table PRODUCTOS (
   ID_PRODUCTO          int                  identity,
   CANTIDAD             int                  null,
   PRECIO               int                  null,
   DESCRIPCION          varchar(50)          null,
   CODIGO_BARRA         varchar(50)          null,
   IVA_10               int                  null,
   IVA_5                int                  null,
   constraint PK_PRODUCTOS primary key (ID_PRODUCTO)
)
go

/*==============================================================*/
/* Table: PROVEEDORES                                           */
/*==============================================================*/
create table PROVEEDORES (
   ID_PROVEEDOR         int                  identity,
   NOMBRE               varchar(50)          null,
   CODIGO               varchar(50)          null,
   DIRECCION            varchar(50)          null,
   CORREO               varchar(50)          null,
   TELEFONO             varchar(50)          null,
   constraint PK_PROVEEDORES primary key (ID_PROVEEDOR)
)
go

/*==============================================================*/
/* Table: TIPOS_MEDIDA                                          */
/*==============================================================*/
create table TIPOS_MEDIDA (
   ID_TIPO_MEDIDA       int                  identity,
   NOMBRE               varchar(50)          null,
   constraint PK_TIPOS_MEDIDA primary key (ID_TIPO_MEDIDA)
)
go

/*==============================================================*/
/* Table: TURNOS                                                */
/*==============================================================*/
create table TURNOS (
   ID_TURNO             int                  identity,
   ID_CAJERO            int                  null,
   FECHA                datetime             null,
   HORA_INICIO          datetime             null,
   FORA_FINAL           datetime             null,
   MONTO_INICIAL        int                  null,
   MONTO_FINAL          int                  null,
   constraint PK_TURNOS primary key (ID_TURNO)
)
go

alter table AJUSTES_PRODUCTO
   add constraint FK_AJUSTES__REFERENCE_MOTIVOS_ foreign key (ID_MOTIVO_AJUSTE)
      references MOTIVOS_AJUSTE (ID_MOTIVO_AJUSTE)
go

alter table AJUSTE_DETALLES
   add constraint FK_AJUSTE_D_REFERENCE_AJUSTES_ foreign key (ID_AJUSTE_PRODUCTO)
      references AJUSTES_PRODUCTO (ID_AJUSTE_PRODUCTO)
go

alter table AJUSTE_DETALLES
   add constraint FK_AJUSTE_D_REFERENCE_PRODUCTO foreign key (ID_PRODUCTO)
      references PRODUCTOS (ID_PRODUCTO)
go

alter table ARQUEOS_CAJA
   add constraint FK_ARQUEOS__REFERENCE_TURNOS foreign key (ID_TURNO)
      references TURNOS (ID_TURNO)
go

alter table ARQUEO_DETALLES
   add constraint FK_ARQUEO_D_REFERENCE_ARQUEOS_ foreign key (ID_ARQUEO)
      references ARQUEOS_CAJA (ID_ARQUEO)
go

alter table ARQUEO_DETALLES
   add constraint FK_ARQUEO_D_REFERENCE_MEDIOS_C foreign key (ID_MEDIO_COBRO)
      references MEDIOS_COBRO (ID_MEDIO_COBRO)
go

alter table COBRO_DETALLES
   add constraint FK_COBRO_DE_REFERENCE_MEDIOS_C foreign key (ID_MEDIO_COBRO)
      references MEDIOS_COBRO (ID_MEDIO_COBRO)
go

alter table COBRO_DETALLES
   add constraint FK_COBRO_DE_REFERENCE_MOVIMIEN foreign key (ID_MOVIMIENTO_DETALLE)
      references MOVIMIENTO_DETALLES (ID_MOVIMIENTO_DETALLE)
go

alter table COMPRAS
   add constraint FK_COMPRAS_REFERENCE_PROVEEDO foreign key (ID_PROVEEDOR)
      references PROVEEDORES (ID_PROVEEDOR)
go

alter table COMPRAS_DETALLES
   add constraint FK_COMPRAS__REFERENCE_PRODUCTO foreign key (ID_PRODUCTO)
      references PRODUCTOS (ID_PRODUCTO)
go

alter table COMPRAS_DETALLES
   add constraint FK_COMPRAS__REFERENCE_COMPRAS foreign key (ID_COMPRA)
      references COMPRAS (ID_COMPRA)
go

alter table ENTRENADORES
   add constraint FK_ENTRENAD_REFERENCE_ESPECIAL foreign key (ID_ESPECIALIDAD)
      references ESPECIALIDADES (ID_ESPECIALIDAD)
go

alter table FACTURA_DETALLES
   add constraint FK_FACTURA__REFERENCE_FACTURAS foreign key (ID_FACTURA)
      references FACTURAS (ID_FACTURA)
go

alter table FACTURA_DETALLES
   add constraint FK_FACTURA__REFERENCE_MEMBRESI foreign key (ID_MEMBRESIA)
      references MEMBRESIAS (ID_MEMBRESIA)
go

alter table FACTURA_DETALLES
   add constraint FK_FACTURA__REFERENCE_PRODUCTO foreign key (ID_PRODUCTO)
      references PRODUCTOS (ID_PRODUCTO)
go

alter table HORARIOS
   add constraint FK_HORARIOS_REFERENCE_ENTRENAD foreign key (ID_ENTRENADOR)
      references ENTRENADORES (ID_ENTRENADOR)
go

alter table MEDICIONES
   add constraint FK_MEDICION_REFERENCE_CLIENTES foreign key (ID_CLIENTE)
      references CLIENTES (ID_CLIENTE)
go

alter table MEDICIONES
   add constraint FK_MEDICION_REFERENCE_ENTRENAD foreign key (ID_ENTRENADOR)
      references ENTRENADORES (ID_ENTRENADOR)
go

alter table MEDICION_DETALLES
   add constraint FK_MEDICION_REFERENCE_TIPOS_ME foreign key (ID_TIPO_MEDIDA)
      references TIPOS_MEDIDA (ID_TIPO_MEDIDA)
go

alter table MEDICION_DETALLES
   add constraint FK_MEDICION_REFERENCE_MEDICION foreign key (ID_MEDICION)
      references MEDICIONES (ID_MEDICION)
go

alter table MEMBRESIAS
   add constraint FK_MEMBRESI_REFERENCE_CLIENTES foreign key (ID_CLIENTE)
      references CLIENTES (ID_CLIENTE)
go

alter table MEMBRESIAS
   add constraint FK_MEMBRESI_REFERENCE_MODALIDA foreign key (ID_MODALIDAD)
      references MODALIDADES (ID_MODALIDAD)
go

alter table MEMBRESIAS
   add constraint FK_MEMBRESI_REFERENCE_ESTADOS_ foreign key (ID_ESTADO_MEMBRESIA)
      references ESTADOS_MEMBRESIA (ID_ESTADO_MEMBRESIA)
go

alter table MEMBRESIAS
   add constraint FK_MEMBRESI_REFERENCE_ENTRENAD foreign key (ID_ENTRENADOR)
      references ENTRENADORES (ID_ENTRENADOR)
go

alter table MOVIMIENTOS
   add constraint FK_MOVIMIEN_REFERENCE_TURNOS foreign key (ID_TURNO)
      references TURNOS (ID_TURNO)
go

alter table MOVIMIENTO_DETALLES
   add constraint FK_MOVIMIEN_REFERENCE_MOVIMIEN foreign key (ID_MOVIMIENTO)
      references MOVIMIENTOS (ID_MOVIMIENTO)
go

alter table MOVIMIENTO_DETALLES
   add constraint FK_MOVIMIEN_REFERENCE_FACTURAS foreign key (ID_FACTURA)
      references FACTURAS (ID_FACTURA)
go

alter table TURNOS
   add constraint FK_TURNOS_REFERENCE_CAJEROS foreign key (ID_CAJERO)
      references CAJEROS (ID_CAJERO)
go


INSERT INTO ESPECIALIDADES(NOMBRE) 
VALUES ('Fitness'),
('Pilates'),
('Yoga')


INSERT INTO ENTRENADORES (ID_ESPECIALIDAD, NOMBRE, CI, TELEFONO)
VALUES (1, 'Juan Lopez', '1245781', '+595987654321'),
(2, 'Marcos Perez', '4578126', '+595987654312'),
(3, 'Sergio Martinez', '7845126', '+595987654123'),
(2, 'Jorge Massa', '1112111', '+595987654444')




