﻿$('body').css("font-family", "'Microsoft YaHei', 'Microsoft JhengHei', SimSun");

$i18n = {
  "Getting Started":"准备",
  "Project":"工程",
  "Patches":"补丁",
  "Building":"构建",
  "About":"关于",
  "Quick build":"快速构建",
  "run(cmd)":"CMD模式",
  "exec(log)":"日志模式",
  "Browse...":"浏览...",
  "<strong>INFO</strong>:You can set the default settings in 'config.js', and your selection will auto save in 'auto_config.js', make you start quickly for next time. If you want to modify the settings later, use the left-side navigition menu to show this page.":
      "<strong>温馨提示</strong>:您可以在\"config.js\"文件中配置默认路径，程序也会自动将选择的设定保存到\"auto_config.js\"中，以便于快速开始。您可以通过左侧的导航菜单再次改变这些设定。",
  "Please configure the base infomation:":"请设置基本信息:",
  "Set the build workspace":"设置工作空间位置",
  "Select build workspace folder:":"选择工作空间位置:",
  "Please select the Windows ISO folder/drive, or the 'sources' folder(auto detect)":"请选择Windows镜像路径，或者sources目录(智能识别)",
  "Select the image path or the 'sources' folder":"请选择Windows镜像路径，或者sources目录",
  "Auto extract the winre.wim":"自动提取winre.wim",
  "<strong>INFO</strong>:the install.wim isn't exist.":"<strong>提示</strong>:install.wim文件不存在。",
  "Select the install.wim file if it needed":"如有必要，请选择install.wim源文件",
  "<strong>ERROR</strong>:the base wim isn't exist.":"<strong>错误</strong>:所需修改wim文件不存在。",
  "Select the extracted install.wim folder if it needed":"如有必要，请选择install.wim的展开目录",
  "Select the extracted install.wim folder:":"选择install.wim的展开目录:",
  "Select the base image(boot.wim/winre.wim or other customed.wim)":"请选择基础映像(boot.wim/winre.wim或者其他自定义wim文件)",
  "Use test\\boot.wim":"使用test\\boot.wim",
  "<strong>Notice</strong>:Please select the correct wim file, and the image index, otherwise cause build failed.":"<STRONG>请注意</STRONG>:对于不同的工程需要选择适当的wim文件及索引号，否则可能导致构建失败。",

  "Skip when project is selected":"当有工程自动选择时，跳过此页面",

  "Current project:":"当前工程:",

  "The _ISO_ folder is not available, you can\'t create bootable ISO image.\r\nPlease make your ISO template manually, or select the Windows ISO folder/drive for auto creating.":
      "当前_ISO_模板目录不可用，您无法创建可启动的ISO镜像。\r\n请手动创建您的ISO模板，或者选择Windows镜像路径，将自动为您创建。",
  "Subst mounted folder to Drive":"将wim挂载目录映射到",
  " Auto":" 自动",
  "<strong>INFO</strong>:If the mounted folder isn't mapping to X:, The patch scripts need use %X%\\ than X:\\ when modifying, deleting the files, and please don't create the shortcuts on building, they may point to the wrong target, do it on booting phase.":
      "<STRONG>请注意</STRONG>:如果挂载目录不是映射到X:驱动器，在补丁脚本中修改和删除文件时，请使用%X%\\来代替路径中的X:\\。同样也无法在构建过程中提前创建快捷方式，因为他们可能会指向错误的路径，请修改启动脚本，在启动阶段进行创建。",
  "Mapping drive is used":"映射驱动器被占用",
  "If the Drive is used by the unfinish build, click Continue to go on, it will be fixed,":"如果此占用是因为某次未完成的构建导致的，请点击继续，程序将自动重置。",
  "otherwise, please select an usable drive.":"否则，请重新指定映射驱动器。",
  "Continue":"继续",
  "Cancel":"取消",
  "0-cleanup":"0-清理",
  "1-run(cmd)":"1-运行(CMD)",
  "1-exec(log)":"1-运行(日志)",
  "2-make_iso":"2-创建镜像",
  "Create ISO after building":" 构建后立即创建ISO",
  "Test ISO after building with:":"构建后测试ISO镜像",
  "Launch":"启动",
  "Open log folder":"打开日志文件夹",
  "Open last build log":"打开最后一次构建日志",
  "Please select a project:":"请选择工程:",
  "Project Information":"工程信息",


  "Please startup with WimBuilder.cmd.":"请通过WimBuilder.cmd启动。",
  "No project to build.":"未选择构建工程。",
  "Do you want to build the [%s] project?":"是否要对[%s]工程进行构建？",
  "Please select a project for building.":"请选择构建工程。",
  "The system cannot find the file specified.":"系统找不到指定的文件。",
  "#LASTDUMMY#":""
}
