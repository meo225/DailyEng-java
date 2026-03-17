package com.dailyeng.repository;

import com.dailyeng.entity.TopicGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface TopicGroupRepository extends JpaRepository<TopicGroup, String> {

    @Query(value = "SELECT * FROM \"TopicGroup\" WHERE \"hubType\" = CAST(:hubType AS \"HubType\") ORDER BY \"order\" ASC",
            nativeQuery = true)
    List<TopicGroup> findByHubTypeOrderByOrderAsc(@Param("hubType") String hubType);
}
