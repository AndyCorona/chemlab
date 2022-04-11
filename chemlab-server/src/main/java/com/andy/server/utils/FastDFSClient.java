package com.andy.server.utils;

import com.andy.server.pojo.FastDFSFile;
import org.csource.common.NameValuePair;
import org.csource.fastdfs.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * fastDFS 工具类
 */
public class FastDFSClient {

    private static Logger logger = LoggerFactory.getLogger(FastDFSClient.class);

    static {
        try {
            //获取配置文件
            String filePath = new ClassPathResource("/config/fdfs_client.conf").getFile().getAbsolutePath();
            //根据配置文件初始化 fastDFS
            ClientGlobal.init(filePath);
        } catch (Exception e) {
            logger.error("fast-DFS 初始化失败", e);
        }
    }

    /**
     * 生成 tracker 服务器端
     *
     * @return
     * @throws IOException
     */
    private static TrackerServer getTrackerServer() throws IOException {
        TrackerClient trackerClient = new TrackerClient();
        return trackerClient.getTrackerServer();

    }

    /**
     * 生成 Storage 客户端
     *
     * @return
     * @throws IOException
     */

    private static StorageClient getStorageClient() throws IOException {
        TrackerServer trackerServer = getTrackerServer();
        return new StorageClient(trackerServer, null);

    }

    /**
     * 上传成功返回信息
     *
     * @param file
     * @return
     */
    public static String[] upload(FastDFSFile file) {
        logger.info("文件名：" + file.getName() + " 文件长度：" + file.getContent().length);
        //文件属性信息
        NameValuePair[] meta_list = new NameValuePair[1];
        meta_list[0] = new NameValuePair("author", file.getAuthor());

        long startTime = System.currentTimeMillis();
        String[] uploadResults = null;
        StorageClient storageClient = null;
        try {
            //获取 storage 客户端
            storageClient = getStorageClient();
            uploadResults = storageClient.upload_file(file.getContent(), file.getExt(), meta_list);
        } catch (Exception e) {
            logger.error("上传失败：" + file.getName(), e);
        }
        logger.info("上传时间：" + (System.currentTimeMillis() - startTime) + "ms");
        //验证上传结果
        if (uploadResults == null && storageClient != null) {
            logger.error("上传失败：" + storageClient.getErrorCode());
        }
        logger.info("上传成功：group_name：" + uploadResults[0] + "，remoteFileName：" + uploadResults[1]);
        return uploadResults;
    }

    /**
     * 下载文件返回输入流
     *
     * @param groupName
     * @param remoteFileName
     * @return
     */
    public static InputStream downFile(String groupName, String remoteFileName) {
        try {
            StorageClient storageClient = getStorageClient();
            byte[] fileByte = storageClient.download_file(groupName, remoteFileName);
            InputStream ins = new ByteArrayInputStream(fileByte);
            return ins;
        } catch (Exception e) {
            logger.error("下载失败");
        }
        return null;
    }

    /**
     * 删除文件
     *
     * @param groupName
     * @param remoteFileName
     */
    public static void deleteFile(String groupName, String remoteFileName) {
        try {
            StorageClient storageClient = getStorageClient();
            int i = storageClient.delete_file(groupName, remoteFileName);
            logger.info("删除成功" + i);
        } catch (Exception e) {
            logger.error("删除失败");
        }
    }

    /**
     * 查看文件信息
     *
     * @param groupName
     * @param remoteFileName
     * @return
     */
    public static FileInfo getFileInfo(String groupName, String remoteFileName) {
        try {
            StorageClient storageClient = getStorageClient();
            FileInfo file_info = storageClient.get_file_info(groupName, remoteFileName);
            return file_info;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 获取文件路径
     *
     * @return
     * @throws IOException
     */
    public static String getTrackerUrl() throws Exception {
        TrackerClient trackerClient = new TrackerClient();
        TrackerServer trackerServer = trackerClient.getTrackerServer();
        StorageServer storageServer = trackerClient.getStoreStorage(trackerServer);
        return "http://" + storageServer.getInetSocketAddress().getHostString() + ":8888/";
    }
}
